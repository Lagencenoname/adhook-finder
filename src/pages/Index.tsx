import { useState, useMemo, useEffect } from "react";
import { HookCard } from "@/components/HookCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterButton } from "@/components/FilterButton";
import { hooksData } from "@/data/hooks";
import { HelpCircle, Filter, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/logo.jpeg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState<string | null>(null);
  const [selectedSecteur, setSelectedSecteur] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header className={`sticky top-0 z-50 border-b border-border backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? 'bg-background/80' : 'bg-background/95'
      }`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                  <SheetDescription>
                    Affinez votre recherche par catégorie et secteur
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Clear Filters Button */}
                  {(selectedCategorie !== null || selectedSecteur !== null) && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCategorie(null);
                        setSelectedSecteur(null);
                      }}
                    >
                      Réinitialiser les filtres
                    </Button>
                  )}

                  {/* Category Filters */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Catégorie
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <FilterButton
                        label="Toutes"
                        isActive={selectedCategorie === null}
                        onClick={() => {
                          setSelectedCategorie(null);
                          setIsFilterSheetOpen(false);
                        }}
                      />
                      {categories.map(cat => (
                        <FilterButton
                          key={cat}
                          label={cat}
                          isActive={selectedCategorie === cat}
                          onClick={() => {
                            setSelectedCategorie(cat === selectedCategorie ? null : cat);
                            setIsFilterSheetOpen(false);
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sector Filters */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Secteur
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <FilterButton
                        label="Tous"
                        isActive={selectedSecteur === null}
                        onClick={() => {
                          setSelectedSecteur(null);
                          setIsFilterSheetOpen(false);
                        }}
                      />
                      {secteurs.map(sect => (
                        <FilterButton
                          key={sect}
                          label={sect}
                          isActive={selectedSecteur === sect}
                          onClick={() => {
                            setSelectedSecteur(sect === selectedSecteur ? null : sect);
                            setIsFilterSheetOpen(false);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <h1 className="text-4xl font-black text-foreground">
              AD HOOKS
            </h1>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Guide d'Utilisation : Tirer le Meilleur d'Ad HOOKS</DialogTitle>
                  <DialogDescription>
                    Découvrez comment utiliser efficacement cette application
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 text-sm">
                  <section>
                    <h3 className="text-lg font-bold mb-3">I. Installation Rapide & Accès Hors Ligne 🚀</h3>
                    <p className="mb-2">L'avantage principal d'Ad HOOKS est sa rapidité d'accès, comme une application native.</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li><strong>Ajouter à l'Écran d'Accueil :</strong> Sur votre mobile, ouvrez le menu du navigateur (les trois points ...) et sélectionnez "Installer l'application" ou "Ajouter à l'écran d'accueil".</li>
                      <li><strong>Usage Garanti :</strong> Ouvrez l'application au moins une fois en ligne. Tous les Hooks sont mis en cache. Vous pouvez désormais rechercher, filtrer et copier des Hooks même sans connexion internet.</li>
                    </ol>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold mb-3">II. Le Secret : Adapter, Ne Jamais Copier 💡</h3>
                    <p className="mb-2 font-semibold text-destructive">Mise en Garde Cruciale :</p>
                    <p className="mb-3">Ces Hooks sont des formules éprouvées, pas des scripts figés. Pour garantir le succès, ils doivent être adaptés à votre audience et à votre personnalité.</p>
                    <h4 className="font-semibold mb-2">Les Règles d'Or de l'Adaptation :</h4>
                    <ul className="space-y-2 ml-2">
                      <li><strong>Règle 1 : L'Inspiration.</strong> Utilisez le Hook pour trouver le ton et la structure d'accroche (ex: Question Provoquante). Cela vous donne un cadre et évite la panne d'inspiration.</li>
                      <li><strong>Règle 2 : La Personnalisation.</strong> Adaptez les mots et les références au vocabulaire exact de votre niche. Remplacez les [CROCHETS]. Votre contenu devient authentique et crédible, pas un simple copier-coller.</li>
                      <li><strong>Règle 3 : La Consultation.</strong> Lisez systématiquement l'Explication de la fiche avant de copier. Comprenez la psychologie derrière le Hook pour savoir quand et où il sera le plus efficace.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold mb-3">III. Trouver et Utiliser le Hook Parfait (En 3 Étapes) 🎯</h3>
                    <p className="mb-3">Utilisez l'application comme un outil de diagnostic rapide en temps réel.</p>
                    <ol className="list-decimal list-inside space-y-3 ml-2">
                      <li>
                        <strong>Ciblage Rapide (Filtres) :</strong>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>Sélectionnez un Secteur (ex: E-commerce, B2B) pour obtenir des Hooks pertinents à votre domaine.</li>
                          <li>Affinez par Catégorie (ex: Urgence, Expertise, Humour) selon l'émotion que vous voulez susciter.</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Recherche Spécifique :</strong>
                        <ul className="list-disc list-inside ml-4 mt-1">
                          <li>Utilisez la Barre de Recherche pour trouver un Hook par mot-clé thématique (ex: tapez immobilier ou recette).</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Action Finale :</strong>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>Localisez le Hook idéal, puis cliquez sur le bouton "Copier le Hook".</li>
                          <li>Collez-le dans votre script ou votre légende, et personnalisez-le immédiatement avant publication.</li>
                        </ul>
                      </li>
                    </ol>
                    <p className="mt-3 font-semibold">Votre Objectif : Transformez le temps passé à chercher l'inspiration en temps passé à créer du contenu engageant.</p>
                  </section>

                  <section className="border-t pt-6">
                    <h3 className="text-lg font-bold mb-3">IV. Prompts IA pour Maximiser vos Hooks 🤖</h3>
                    <p className="mb-4">Utilisez ces prompts avec ChatGPT, Claude ou tout autre IA pour transformer vos Hooks en contenu complet.</p>
                    
                    <div className="space-y-4">
                      <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                        <h4 className="font-semibold mb-2">Prompt 1 : L'Expansion (Scénario ou Post)</h4>
                        <p className="text-xs text-muted-foreground mb-2">Agis comme un scénariste expert en contenu court et un rédacteur publicitaire percutant. Développe le Hook que je te fournis en un script vidéo de 60 secondes (ou en un post Instagram/LinkedIn de trois paragraphes). Le ton doit être [INSÉRER VOTRE TON : ex: éducatif et humoristique]. Le script doit inclure : introduction, développement du problème/solution et appel à l'action (CTA) clair. Le Hook à développer est : [COLLEZ VOTRE HOOK COPIÉ ICI]</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            navigator.clipboard.writeText("Agis comme un scénariste expert en contenu court et un rédacteur publicitaire percutant. Développe le Hook que je te fournis en un script vidéo de 60 secondes (ou en un post Instagram/LinkedIn de trois paragraphes). Le ton doit être [INSÉRER VOTRE TON : ex: éducatif et humoristique]. Le script doit inclure : introduction, développement du problème/solution et appel à l'action (CTA) clair. Le Hook à développer est : [COLLEZ VOTRE HOOK COPIÉ ICI]");
                            toast({ title: "✓ Prompt copié !", description: "Collez-le dans votre IA favorite." });
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copier ce prompt
                        </Button>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                        <h4 className="font-semibold mb-2">Prompt 2 : La Justification (Preuve Sociale)</h4>
                        <p className="text-xs text-muted-foreground mb-2">Agis comme un créateur de preuves sociales persuasives et un expert en conversion client. Rédige trois (3) exemples de témoignages clients ou de cas d'étude qui valident l'affirmation faite dans le Hook que je te fournis. Chaque témoignage doit suivre le format "Problème initial → Solution → Résultat concret". Le thème principal du problème à résoudre est [LE PROBLÈME PRINCIPAL DU HOOK]. Le Hook auquel ces preuves doivent répondre est : [COLLEZ VOTRE HOOK COPIÉ ICI]</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            navigator.clipboard.writeText("Agis comme un créateur de preuves sociales persuasives et un expert en conversion client. Rédige trois (3) exemples de témoignages clients ou de cas d'étude qui valident l'affirmation faite dans le Hook que je te fournis. Chaque témoignage doit suivre le format \"Problème initial → Solution → Résultat concret\". Le thème principal du problème à résoudre est [LE PROBLÈME PRINCIPAL DU HOOK]. Le Hook auquel ces preuves doivent répondre est : [COLLEZ VOTRE HOOK COPIÉ ICI]");
                            toast({ title: "✓ Prompt copié !", description: "Collez-le dans votre IA favorite." });
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copier ce prompt
                        </Button>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                        <h4 className="font-semibold mb-2">Prompt 3 : L'Optimisation (Titres/Légendes)</h4>
                        <p className="text-xs text-muted-foreground mb-2">Agis comme un spécialiste de l'optimisation pour les moteurs de recherche et de l'engagement (SEO/Engagement). Propose cinq (5) options de titres accrocheurs (pour YouTube/Vidéo) ou de légendes courtes (pour Instagram/TikTok) basées sur le Hook que je te fournis. Les options doivent maximiser le Taux de Clics (CTR). Utilise la technique de copywriting de [VOTRE TECHNIQUE PRÉFÉRÉE : ex: La Curiosité, La Rareté ou L'Urgence]. Le Hook concerné est : [COLLEZ VOTRE HOOK COPIÉ ICI]</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            navigator.clipboard.writeText("Agis comme un spécialiste de l'optimisation pour les moteurs de recherche et de l'engagement (SEO/Engagement). Propose cinq (5) options de titres accrocheurs (pour YouTube/Vidéo) ou de légendes courtes (pour Instagram/TikTok) basées sur le Hook que je te fournis. Les options doivent maximiser le Taux de Clics (CTR). Utilise la technique de copywriting de [VOTRE TECHNIQUE PRÉFÉRÉE : ex: La Curiosité, La Rareté ou L'Urgence]. Le Hook concerné est : [COLLEZ VOTRE HOOK COPIÉ ICI]");
                            toast({ title: "✓ Prompt copié !", description: "Collez-le dans votre IA favorite." });
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copier ce prompt
                        </Button>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                        <h4 className="font-semibold mb-2">Prompt 4 : La Segmentation d'Audience (Idées de Réponse)</h4>
                        <p className="text-xs text-muted-foreground mb-2">Agis comme un expert en segmentation d'audience et en gestion de communauté. Pour le Hook que je te fournis, génère les trois (3) principales objections ou questions que l'audience cible pourrait poser en commentaire, et propose une réponse détaillée pour chaque objection. Les objections doivent être spécifiques à la niche [VOTRE NICHE]. La réponse doit renforcer votre expertise. Le Hook à analyser est : [COLLEZ VOTRE HOOK COPIÉ ICI]</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            navigator.clipboard.writeText("Agis comme un expert en segmentation d'audience et en gestion de communauté. Pour le Hook que je te fournis, génère les trois (3) principales objections ou questions que l'audience cible pourrait poser en commentaire, et propose une réponse détaillée pour chaque objection. Les objections doivent être spécifiques à la niche [VOTRE NICHE]. La réponse doit renforcer votre expertise. Le Hook à analyser est : [COLLEZ VOTRE HOOK COPIÉ ICI]");
                            toast({ title: "✓ Prompt copié !", description: "Collez-le dans votre IA favorite." });
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copier ce prompt
                        </Button>
                      </div>

                      <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                        <h4 className="font-semibold mb-2">Prompt 5 : L'Idée d'Aimant à Prospects (Lead Magnet)</h4>
                        <p className="text-xs text-muted-foreground mb-2">Agis comme un stratège marketing spécialisé dans la création d'aimants à prospects (Lead Magnets) à haute valeur perçue. Propose trois (3) idées d'aimants à prospects (ex: checklist, guide, template) qui pourraient être offerts en fin de vidéo/post pour les personnes intéressées par le Hook que je te fournis. Chaque idée doit avoir un titre précis et une description d'une phrase. L'aimant à prospects doit résoudre directement la douleur ou le problème soulevé par le Hook. Le Hook à convertir en offre est : [COLLEZ VOTRE HOOK COPIÉ ICI]</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            navigator.clipboard.writeText("Agis comme un stratège marketing spécialisé dans la création d'aimants à prospects (Lead Magnets) à haute valeur perçue. Propose trois (3) idées d'aimants à prospects (ex: checklist, guide, template) qui pourraient être offerts en fin de vidéo/post pour les personnes intéressées par le Hook que je te fournis. Chaque idée doit avoir un titre précis et une description d'une phrase. L'aimant à prospects doit résoudre directement la douleur ou le problème soulevé par le Hook. Le Hook à convertir en offre est : [COLLEZ VOTRE HOOK COPIÉ ICI]");
                            toast({ title: "✓ Prompt copié !", description: "Collez-le dans votre IA favorite." });
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copier ce prompt
                        </Button>
                      </div>
                    </div>
                  </section>

                  <section className="border-t pt-6">
                    <h3 className="text-lg font-bold mb-3">Questions, Collaboration ou Soumissions de Hooks ?</h3>
                    <p className="mb-4">Nous sommes à votre écoute pour améliorer Ad HOOKS et enrichir notre collection.</p>
                    <Button asChild className="w-full">
                      <a href="mailto:digitalskillshub.pro@gmail.com">
                        Contactez-nous
                      </a>
                    </Button>
                  </section>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>


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
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center space-y-4">
            <img src={logo} alt="Ad Hooks Content Logo" className="h-16 w-auto" />
            <p className="text-sm text-muted-foreground">
              Ad HOOKS © 2025 - Votre collection d'accroches publicitaires
            </p>
            <p className="text-xs text-muted-foreground">
              Développée par{' '}
              <a 
                href="https://kloo.me/softapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                SoftApp
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
