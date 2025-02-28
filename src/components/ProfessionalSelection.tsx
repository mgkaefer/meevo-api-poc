
import { useState, useEffect } from "react";
import { Professional, Service } from "@/types";
import { getProfessionalsByService } from "@/utils/api";
import { cn } from "@/lib/utils";

interface ProfessionalSelectionProps {
  service: Service;
  onSelect: (professional: Professional) => void;
  onBack: () => void;
}

const ProfessionalSelection: React.FC<ProfessionalSelectionProps> = ({
  service,
  onSelect,
  onBack
}) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const data = await getProfessionalsByService(service.id);
        setProfessionals(data);
      } catch (error) {
        console.error("Failed to fetch professionals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [service.id]);

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
          <h2 className="text-2xl font-semibold">Select a Specialist</h2>
          <div className="text-sm text-muted-foreground flex items-center">
            <span>For {service.name}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span>${service.price}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i} 
              className="rounded-xl border p-4 h-32 shimmer animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))
        ) : professionals.length > 0 ? (
          professionals.map((professional, index) => (
            <div
              key={professional.id}
              className={cn(
                "rounded-xl border p-4 cursor-pointer hover:border-primary/50 transition-all",
                "hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              )}
              onClick={() => onSelect(professional)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                  {professional.imageUrl && (
                    <img
                      src={professional.imageUrl}
                      alt={professional.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{professional.name}</h3>
                  <p className="text-sm text-muted-foreground">{professional.title}</p>
                  {professional.bio && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {professional.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No specialists available for this service</p>
            <button
              onClick={onBack}
              className="mt-4 text-primary hover:underline"
            >
              Choose a different service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalSelection;
