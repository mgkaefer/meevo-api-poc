
import { Service, Professional, TimeSlot, Appointment } from "@/types";

// Mock data
const services: Service[] = [
  {
    id: "s1",
    name: "Full Leg Wax",
    description: "Complete waxing treatment for both legs, from ankle to upper thigh.",
    price: 65,
    duration: 45,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "s2",
    name: "Brazilian Wax",
    description: "Complete hair removal from the entire intimate area, front to back.",
    price: 75,
    duration: 30,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "s3",
    name: "Underarm Wax",
    description: "Quick and effective hair removal from the underarm area.",
    price: 25,
    duration: 15,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "s4",
    name: "Eyebrow Wax",
    description: "Sculpt and define your eyebrows with precise waxing.",
    price: 20,
    duration: 15,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "s5",
    name: "Full Arm Wax",
    description: "Complete hair removal from fingers to shoulders.",
    price: 45,
    duration: 30,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "s6",
    name: "Bikini Line Wax",
    description: "Hair removal along the bikini line for a clean appearance.",
    price: 35,
    duration: 20,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "s7",
    name: "Full Body Wax",
    description: "Complete hair removal treatment for the entire body.",
    price: 180,
    duration: 120,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "s8",
    name: "Back & Shoulders Wax",
    description: "Hair removal treatment for the back and shoulder areas.",
    price: 50,
    duration: 30,
    imageUrl: "/placeholder.svg"
  }
];

const professionals: Professional[] = [
  {
    id: "p1",
    name: "Emma Johnson",
    title: "Senior Wax Specialist",
    imageUrl: "/placeholder.svg",
    bio: "With 8 years of experience, Emma specializes in Brazilian and full body waxing with a gentle touch.",
    serviceIds: ["s1", "s2", "s3", "s5", "s6", "s7"]
  },
  {
    id: "p2",
    name: "Michael Chen",
    title: "Wax Technician",
    imageUrl: "/placeholder.svg",
    bio: "Michael is known for his quick and painless technique, specializing in men's waxing services.",
    serviceIds: ["s1", "s3", "s5", "s8"]
  },
  {
    id: "p3",
    name: "Sofia Rodriguez",
    title: "Esthetician",
    imageUrl: "/placeholder.svg",
    bio: "Sofia is our facial waxing expert, with special expertise in eyebrow shaping and facial hair removal.",
    serviceIds: ["s3", "s4", "s6"]
  },
  {
    id: "p4",
    name: "David Kim",
    title: "Advanced Wax Specialist",
    imageUrl: "/placeholder.svg",
    bio: "David combines waxing with skincare knowledge for an exceptional experience. He specializes in full body treatments.",
    serviceIds: ["s1", "s2", "s5", "s7", "s8"]
  }
];

// API functions
export const getServices = async (): Promise<Service[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 500);
  });
};

export const getProfessionalsByService = async (serviceId: string): Promise<Professional[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProfessionals = professionals.filter(p => 
        p.serviceIds.includes(serviceId)
      );
      resolve(filteredProfessionals);
    }, 500);
  });
};

export const getAvailableTimeSlots = async (
  professionalId: string,
  date: string,
  serviceId: string
): Promise<TimeSlot[]> => {
  // Find the service to get its duration
  const service = services.find(s => s.id === serviceId);
  if (!service) {
    return Promise.reject(new Error("Service not found"));
  }

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Start times between 9 AM and 5 PM with 30 minute intervals
      const baseDate = new Date(date);
      baseDate.setHours(9, 0, 0, 0);
      
      const slots: TimeSlot[] = [];
      
      // Generate time slots
      for (let i = 0; i < 16; i++) {
        const startTime = new Date(baseDate);
        startTime.setMinutes(startTime.getMinutes() + i * 30);
        
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + service.duration);
        
        // Don't add slots that would end after business hours (6 PM)
        if (endTime.getHours() >= 18) continue;

        // Randomly determine availability (70% chance of being available)
        const available = Math.random() > 0.3;
        
        slots.push({
          id: `slot-${i}`,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          available
        });
      }
      
      resolve(slots);
    }, 700);
  });
};

export const createAppointment = async (appointment: Appointment): Promise<Appointment> => {
  console.log('Creating appointment:', appointment);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a successful booking
      resolve({
        ...appointment,
        id: `app-${Date.now()}`,
        status: 'booked',
        createdAt: new Date().toISOString()
      });
    }, 1000);
  });
};
