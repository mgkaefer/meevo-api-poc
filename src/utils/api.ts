
import { Service, Professional, TimeSlot, Appointment } from "@/types";
import axios from "axios";

// Mock data
const services: Service[] = [
  {
    id: "s1",
    name: "Full Leg Wax",
    description:
      "Complete waxing treatment for both legs, from ankle to upper thigh.",
    price: 65,
    duration: 45,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "s2",
    name: "Brazilian Wax",
    description:
      "Complete hair removal from the entire intimate area, front to back.",
    price: 75,
    duration: 30,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "s3",
    name: "Underarm Wax",
    description: "Quick and effective hair removal from the underarm area.",
    price: 25,
    duration: 15,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "s4",
    name: "Eyebrow Wax",
    description: "Sculpt and define your eyebrows with precise waxing.",
    price: 20,
    duration: 15,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "s5",
    name: "Full Arm Wax",
    description: "Complete hair removal from fingers to shoulders.",
    price: 45,
    duration: 30,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "s6",
    name: "Bikini Line Wax",
    description: "Hair removal along the bikini line for a clean appearance.",
    price: 35,
    duration: 20,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "s7",
    name: "Full Body Wax",
    description: "Complete hair removal treatment for the entire body.",
    price: 180,
    duration: 120,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "s8",
    name: "Back & Shoulders Wax",
    description: "Hair removal treatment for the back and shoulder areas.",
    price: 50,
    duration: 30,
    imageUrl: "/placeholder.svg",
  },
];

const professionals: Professional[] = [
  {
    id: "p1",
    name: "Emma Johnson",
    title: "Senior Wax Specialist",
    imageUrl: "/placeholder.svg",
    bio: "With 8 years of experience, Emma specializes in Brazilian and full body waxing with a gentle touch.",
    serviceIds: ["s1", "s2", "s3", "s5", "s6", "s7"],
  },
  {
    id: "p2",
    name: "Michael Chen",
    title: "Wax Technician",
    imageUrl: "/placeholder.svg",
    bio: "Michael is known for his quick and painless technique, specializing in men's waxing services.",
    serviceIds: ["s1", "s3", "s5", "s8"],
  },
  {
    id: "p3",
    name: "Sofia Rodriguez",
    title: "Esthetician",
    imageUrl: "/placeholder.svg",
    bio: "Sofia is our facial waxing expert, with special expertise in eyebrow shaping and facial hair removal.",
    serviceIds: ["s3", "s4", "s6"],
  },
  {
    id: "p4",
    name: "David Kim",
    title: "Advanced Wax Specialist",
    imageUrl: "/placeholder.svg",
    bio: "David combines waxing with skincare knowledge for an exceptional experience. He specializes in full body treatments.",
    serviceIds: ["s1", "s2", "s5", "s7", "s8"],
  },
];

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const tenantId = import.meta.env.VITE_TENANT_ID;
const locationId = import.meta.env.VITE_LOCATION_ID;

// API functions
export const getServices = async (token: string): Promise<Service[]> => {
  // For now return the mock data until we implement the API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 500);
  });
  
  // Actual API implementation - commented out until API is ready
  /*
  const response = await axios.get(`${baseUrl}/v1/book/appointmentCategories`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: {
      TenantId: tenantId,
      LocationId: locationId,
    },
  });

  return response.data.Data.map((item: any) => ({
    id: item.AppointmentCategoryId,
    name: item.DisplayName,
    description: "",
    price: 0,
    duration: 0,
    imageUrl: "/placeholder.svg",
  }));
  */
};

export const getProfessionalsByService = async (
  serviceId: string,
  token: string
): Promise<Professional[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProfessionals = professionals.filter((p) =>
        p.serviceIds.includes(serviceId)
      );
      resolve(filteredProfessionals);
    }, 500);
  });
};

export const getAvailableTimeSlots = async (
  token: string,
  professionalId: string,
  date: string,
  serviceId: string
): Promise<TimeSlot[]> => {
  // Mock implementation - simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate 8 random time slots starting from 9 AM
      const baseTime = new Date(`${date}T09:00:00`);
      const slots: TimeSlot[] = [];
      
      for (let i = 0; i < 8; i++) {
        const startTime = new Date(baseTime);
        startTime.setMinutes(startTime.getMinutes() + i * 60);
        
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 45);
        
        slots.push({
          id: `slot-${i}`,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          available: Math.random() > 0.3, // 70% chance of being available
        });
      }
      
      resolve(slots);
    }, 500);
  });
  
  // Actual API implementation - commented out until API is ready
  /*
  const response = await axios.get(`${baseUrl}/v1/book/availability`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: {
      TenantId: tenantId,
      LocationId: locationId,
      EmployeeId: professionalId,
      ServiceId: serviceId,
      Date: date,
    },
  });

  return response.data.Data.map((slot: any) => ({
    id: slot.AvailabilityId,
    startTime: slot.StartTime,
    endTime: slot.EndTime,
    available: slot.IsAvailable,
  }));
  */
};

export const createAppointment = async (
  token: string,
  appointment: Appointment
): Promise<Appointment> => {
  // Mock implementation - simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...appointment,
        id: `appointment-${Date.now()}`,
        status: "booked",
        createdAt: new Date().toISOString(),
      });
    }, 1000);
  });
  
  // Actual API implementation - commented out until API is ready
  /*
  const response = await axios.post(
    `${baseUrl}/v1/book/appointments`,
    {
      TenantId: tenantId,
      LocationId: locationId,
      ServiceId: appointment.serviceId,
      EmployeeId: appointment.professionalId,
      Date: appointment.date,
      StartTime: appointment.startTime,
      EndTime: appointment.endTime,
      Customer: {
        Name: appointment.customerName,
        Email: appointment.customerEmail,
        Phone: appointment.customerPhone,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return {
    ...appointment,
    id: response.data.Data.AppointmentId,
    status: "booked",
    createdAt: new Date().toISOString(),
  };
  */
};
