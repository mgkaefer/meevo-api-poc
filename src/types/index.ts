
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  imageUrl?: string;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  imageUrl?: string;
  bio?: string;
  serviceIds: string[]; // services they can perform
}

export interface TimeSlot {
  id: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  available: boolean;
}

export interface Appointment {
  id?: string;
  serviceId: string;
  professionalId: string;
  date: string; // ISO date string
  startTime: string; // ISO time string
  endTime: string; // ISO time string
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status?: 'booked' | 'confirmed' | 'cancelled';
  createdAt?: string;
}

export interface BookingState {
  step: 'service' | 'professional' | 'datetime' | 'checkout' | 'confirmation';
  selectedService?: Service;
  selectedProfessional?: Professional;
  selectedDate?: string;
  selectedTimeSlot?: TimeSlot;
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}
