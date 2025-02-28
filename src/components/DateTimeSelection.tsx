
import { useState, useEffect } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Service, Professional, TimeSlot } from "@/types";
import { getAvailableTimeSlots } from "@/utils/api";
import { cn } from "@/lib/utils";

interface DateTimeSelectionProps {
  service: Service;
  professional: Professional;
  onSelect: (date: string, timeSlot: TimeSlot) => void;
  onBack: () => void;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  service,
  professional,
  onSelect,
  onBack
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate next 14 days for selection
  const dateOptions = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    const fetchTimeSlots = async () => {
      setLoading(true);
      try {
        const dateString = selectedDate.toISOString().split('T')[0];
        const slots = await getAvailableTimeSlots(
          professional.id,
          dateString,
          service.id
        );
        setTimeSlots(slots);
      } catch (error) {
        console.error("Failed to fetch time slots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate, professional.id, service.id]);

  const formatTimeSlot = (timeString: string) => {
    const date = new Date(timeString);
    return format(date, "h:mm a");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="mr-3 p-2 rounded-full hover:bg-secondary"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-semibold">Select Date & Time</h2>
          <div className="text-sm text-muted-foreground">
            <span>With {professional.name}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span>{service.name}</span>
          </div>
        </div>
      </div>

      {/* Date selection */}
      <div className="mt-6 mb-6">
        <h3 className="text-sm font-medium mb-3">Select Date</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
          {dateOptions.map((date, index) => (
            <button
              key={date.toISOString()}
              className={cn(
                "flex flex-col items-center justify-center p-3 min-w-[70px] rounded-lg border transition-all",
                isSameDay(date, selectedDate) 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "hover:border-primary/40 hover:bg-secondary"
              )}
              onClick={() => setSelectedDate(date)}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <span className="text-xs uppercase">{format(date, "EEE")}</span>
              <span className="text-xl font-semibold">{format(date, "d")}</span>
              <span className="text-xs">{format(date, "MMM")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time selection */}
      <div>
        <h3 className="text-sm font-medium mb-3">Select Time</h3>
        {loading ? (
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="rounded-lg border h-14 shimmer animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        ) : timeSlots.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot, index) => (
              <button
                key={slot.id}
                className={cn(
                  "p-3 rounded-lg border h-14 flex flex-col justify-center items-center transition-all",
                  slot.available 
                    ? "hover:border-primary/40 hover:bg-secondary active:scale-95" 
                    : "opacity-50 cursor-not-allowed",
                  "transform transition-transform"
                )}
                disabled={!slot.available}
                onClick={() => slot.available && onSelect(
                  selectedDate.toISOString().split('T')[0], 
                  slot
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <span className="font-medium">{formatTimeSlot(slot.startTime)}</span>
                <span className="text-xs text-muted-foreground">
                  {slot.available ? "Available" : "Unavailable"}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-muted-foreground">No available time slots</p>
            <p className="text-sm text-muted-foreground mt-1">Please try another date</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateTimeSelection;
