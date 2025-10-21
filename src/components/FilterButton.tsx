import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const FilterButton = ({ label, isActive, onClick }: FilterButtonProps) => {
  return (
    <Button
      variant={isActive ? "default" : "secondary"}
      onClick={onClick}
      className={cn(
        "transition-smooth rounded-full px-6 py-2 font-medium",
        isActive && "gradient-primary shadow-glow"
      )}
    >
      {label}
    </Button>
  );
};
