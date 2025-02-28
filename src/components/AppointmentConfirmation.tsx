
import { Appointment, Service, Professional } from "@/types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AppointmentConfirmationProps {
  appointment: Appointment;
  service: Service;
  professional: Professional;
  onBookAnother: () => void;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  appointment,
  service,
  professional,
  onBookAnother
}) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "EEEE, MMMM d, yyyy");
  };

  const formatTime = (timeString: string) => {
    return format(new Date(timeString), "h:mm a");
  };

  return (
    <div className="animate-fade-in text-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold">Booking Confirmed</h2>
        <p className="text-muted-foreground mt-1">
          We've sent the details to your email
        </p>
      </div>

      <div className="max-w-sm mx-auto mb-8 p-5 rounded-lg border glass">
        <div className="mb-4 pb-4 border-b">
          <h3 className="font-medium mb-4 text-center">Appointment Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{formatDate(appointment.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{formatTime(appointment.startTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Specialist:</span>
              <span className="font-medium">{professional.name}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3 text-center">Location</h3>
          <p className="text-center text-sm">
            GlowWax Studio<br />
            123 Beauty Lane<br />
            New York, NY 10001
          </p>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-6">
        <p>Your confirmation code: <span className="font-mono font-medium">{appointment.id}</span></p>
      </div>

      <button
        onClick={onBookAnother}
        className={cn(
          "w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium",
          "hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20",
          "transition-all transform active:scale-98"
        )}
      >
        Book Another Appointment
      </button>
    </div>
  );
};

export default AppointmentConfirmation;
