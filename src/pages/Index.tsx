import { useState, useMemo } from "react";
import { HookCard } from "@/components/HookCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterButton } from "@/components/FilterButton";
import { hooksData } from "@/data/hooks";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState<string | null>(null);
  const [selectedSecteur, setSelectedSecteur] = useState<string | null>(null);

  // Extract unique categories and sectors
  const categories = useMemo(() => {
    return Array.from(new Set(hooksData.map(hook => hook.categorie)));
  }, []);

  const secteurs = useMemo(() => {
    return Array.from(new Set(hooksData.map(hook => hook.secteur)));
  }, []);

  // Filter hooks based on search and filters
  const filteredHooks = useMemo(() => {
    return hooksData.filter(hook => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        hook.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hook.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategorie = selectedCategorie === null || hook.categorie === selectedCategorie;

      // Sector filter
      const matchesSecteur = selectedSecteur === null || hook.secteur === selectedSecteur;

      return matchesSearch && matchesCategorie && matchesSecteur;
    });
  }, [searchQuery, selectedCategorie, selectedSecteur]);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-black bg-clip-text text-transparent gradient-primary">
              Ad HOOKS
            </h1>
          </div>
          
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      {/* Filters Section */}
      <section className="border-b border-border bg-card/30 sticky top-[145px] z-40 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 space-y-4">
          {/* Category Filters */}
          <div className="space-y-2">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Catégorie
            </h2>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="Toutes"
                isActive={selectedCategorie === null}
                onClick={() => setSelectedCategorie(null)}
              />
              {categories.map(cat => (
                <FilterButton
                  key={cat}
                  label={cat}
                  isActive={selectedCategorie === cat}
                  onClick={() => setSelectedCategorie(cat === selectedCategorie ? null : cat)}
                />
              ))}
            </div>
          </div>

          {/* Sector Filters */}
          <div className="space-y-2">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Secteur
            </h2>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="Tous"
                isActive={selectedSecteur === null}
                onClick={() => setSelectedSecteur(null)}
              />
              {secteurs.map(sect => (
                <FilterButton
                  key={sect}
                  label={sect}
                  isActive={selectedSecteur === sect}
                  onClick={() => setSelectedSecteur(sect === selectedSecteur ? null : sect)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredHooks.length} hook{filteredHooks.length !== 1 ? 's' : ''} trouvé{filteredHooks.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Cards Grid */}
        {filteredHooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHooks.map(hook => (
              <HookCard
                key={hook.id}
                titre={hook.titre}
                categorie={hook.categorie}
                secteur={hook.secteur}
                hookText={hook.hook_text}
                explication={hook.explication}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl text-muted-foreground mb-2">Aucun hook trouvé</p>
            <p className="text-sm text-muted-foreground">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Ad HOOKS © 2025 - Votre collection d'accroches publicitaires
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
