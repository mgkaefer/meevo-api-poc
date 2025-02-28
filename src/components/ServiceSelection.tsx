
import { useState, useEffect } from "react";
import { Service } from "@/types";
import { getServices } from "@/utils/api";
import { cn } from "@/lib/utils";

interface ServiceSelectionProps {
  onSelect: (service: Service) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onSelect }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Select a Service</h2>
        <p className="text-muted-foreground">Choose the waxing service you need</p>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search services..."
          className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i} 
              className="rounded-xl border p-4 h-24 shimmer animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))
        ) : filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "rounded-xl border p-4 cursor-pointer hover:border-primary/50 transition-all",
                "hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              )}
              onClick={() => onSelect(service)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {service.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${service.price}</p>
                  <p className="text-xs text-muted-foreground">{service.duration} min</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No services found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSelection;
