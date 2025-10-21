import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface HookCardProps {
  titre: string;
  categorie: string;
  secteur: string;
  hookText: string;
  explication: string;
}

export const HookCard = ({ titre, categorie, secteur, hookText, explication }: HookCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hookText);
      setCopied(true);
      toast({
        title: "✓ Hook copié !",
        description: "Le texte a été copié dans votre presse-papiers.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le texte.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="gradient-card border-border transition-smooth hover:border-primary hover:shadow-glow p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-foreground">{titre}</h3>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {categorie}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            {secteur}
          </span>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-lg p-4 border border-border">
        <p className="text-lg font-semibold text-foreground leading-relaxed">
          "{hookText}"
        </p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {explication}
      </p>

      <Button
        onClick={handleCopy}
        className="w-full gradient-primary shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-pulse-subtle"
        size="lg"
      >
        {copied ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Copié !
          </>
        ) : (
          <>
            <Copy className="mr-2 h-5 w-5" />
            Copier le Hook
          </>
        )}
      </Button>
    </Card>
  );
};
