
import { useState } from "react";
import { Service, Professional, TimeSlot, Appointment } from "@/types";
import { createAppointment } from "@/utils/api";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CheckoutProps {
  service: Service;
  professional: Professional;
  date: string;
  timeSlot: TimeSlot;
  onComplete: (appointment: Appointment) => void;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  service,
  professional,
  date,
  timeSlot,
  onComplete,
  onBack
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const appointment: Appointment = {
        serviceId: service.id,
        professionalId: professional.id,
        date,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone
      };
      
      const result = await createAppointment(appointment);
      
      toast({
        title: "Appointment Booked",
        description: "Your appointment has been successfully booked",
      });
      
      onComplete(result);
    } catch (error) {
      console.error("Failed to book appointment:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "EEEE, MMMM d, yyyy");
  };

  const formatTime = (timeString: string) => {
    return format(new Date(timeString), "h:mm a");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-3 p-2 rounded-full hover:bg-secondary"
          aria-label="Go back"
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <h2 className="text-2xl font-semibold">Complete Booking</h2>
      </div>

      {/* Booking Summary */}
      <div className="mb-6 p-4 rounded-lg border bg-secondary/50">
        <h3 className="font-medium mb-3">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service:</span>
            <span className="font-medium">{service.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Price:</span>
            <span className="font-medium">${service.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Specialist:</span>
            <span className="font-medium">{professional.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{formatDate(date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{formatTime(timeSlot.startTime)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{service.duration} min</span>
          </div>
        </div>
      </div>

      {/* Customer Information Form */}
      <form onSubmit={handleSubmit}>
        <h3 className="font-medium mb-3">Your Information</h3>
        <div className="space-y-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2",
                errors.name ? "border-destructive focus:ring-destructive/20" : "focus:ring-primary/20"
              )}
              disabled={loading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2",
                errors.email ? "border-destructive focus:ring-destructive/20" : "focus:ring-primary/20"
              )}
              disabled={loading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="phone" 
              className="block text-sm font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2",
                errors.phone ? "border-destructive focus:ring-destructive/20" : "focus:ring-primary/20"
              )}
              disabled={loading}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={cn(
            "w-full mt-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium",
            "hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20",
            "transition-all transform active:scale-98",
            loading && "opacity-70 cursor-not-allowed"
          )}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Book Appointment"
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
