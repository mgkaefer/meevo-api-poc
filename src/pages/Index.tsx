
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ServiceSelection from "@/components/ServiceSelection";
import ProfessionalSelection from "@/components/ProfessionalSelection";
import DateTimeSelection from "@/components/DateTimeSelection";
import Checkout from "@/components/Checkout";
import AppointmentConfirmation from "@/components/AppointmentConfirmation";
import { BookingState, Service, Professional, TimeSlot, Appointment } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface IndexProps {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const Index = ({ token, isLoading, error }: IndexProps) => {
  const [bookingState, setBookingState] = useState<BookingState>({
    step: "service"
  });
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const { toast } = useToast();

  // Handle token loading and errors
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Add smooth transition between steps with automatic scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [bookingState.step]);

  const handleSelectService = (service: Service) => {
    setBookingState({
      ...bookingState,
      step: "professional",
      selectedService: service
    });
  };

  const handleSelectProfessional = (professional: Professional) => {
    setBookingState({
      ...bookingState,
      step: "datetime",
      selectedProfessional: professional
    });
  };

  const handleSelectDateTime = (date: string, timeSlot: TimeSlot) => {
    setBookingState({
      ...bookingState,
      step: "checkout",
      selectedDate: date,
      selectedTimeSlot: timeSlot
    });
  };

  const handleCompleteBooking = (appointmentData: Appointment) => {
    setAppointment(appointmentData);
    setBookingState({
      ...bookingState,
      step: "confirmation"
    });
  };

  const handleBackToServices = () => {
    setBookingState({
      step: "service"
    });
  };

  const handleBackToProfessionals = () => {
    setBookingState({
      ...bookingState,
      step: "professional"
    });
  };

  const handleBackToDateTime = () => {
    setBookingState({
      ...bookingState,
      step: "datetime"
    });
  };

  const renderStep = () => {
    // Show loading state if token is loading
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg">Loading application...</p>
        </div>
      );
    }

    // Show error state if there's an error or no token
    if (error || !token) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="text-red-500 text-xl mb-4">
            Unable to initialize the application
          </div>
          <p className="text-muted-foreground">
            {error || "Authentication token is missing"}
          </p>
        </div>
      );
    }

    switch (bookingState.step) {
      case "service":
        return <ServiceSelection onSelect={handleSelectService} token={token} />;
      
      case "professional":
        if (!bookingState.selectedService) return null;
        return (
          <ProfessionalSelection
            service={bookingState.selectedService}
            onSelect={handleSelectProfessional}
            onBack={handleBackToServices}
            token={token}
          />
        );
      
      case "datetime":
        if (!bookingState.selectedService || !bookingState.selectedProfessional) return null;
        return (
          <DateTimeSelection
            service={bookingState.selectedService}
            professional={bookingState.selectedProfessional}
            onSelect={handleSelectDateTime}
            onBack={handleBackToProfessionals}
            token={token}
          />
        );
      
      case "checkout":
        if (
          !bookingState.selectedService ||
          !bookingState.selectedProfessional ||
          !bookingState.selectedDate ||
          !bookingState.selectedTimeSlot
        ) return null;
        
        return (
          <Checkout
            service={bookingState.selectedService}
            professional={bookingState.selectedProfessional}
            date={bookingState.selectedDate}
            timeSlot={bookingState.selectedTimeSlot}
            onComplete={handleCompleteBooking}
            onBack={handleBackToDateTime}
            token={token}
          />
        );
      
      case "confirmation":
        if (
          !appointment ||
          !bookingState.selectedService ||
          !bookingState.selectedProfessional
        ) return null;
        
        return (
          <AppointmentConfirmation
            appointment={appointment}
            service={bookingState.selectedService}
            professional={bookingState.selectedProfessional}
            onBookAnother={handleBackToServices}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {renderStep()}
      </div>
    </Layout>
  );
};

export default Index;
