import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Rechercher par titre ou tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 h-14 text-base bg-card border-border transition-smooth focus:border-primary focus:shadow-glow"
      />
    </div>
  );
};
