export interface Hook {
  id: number;
  titre: string;
  categorie: string;
  secteur: string;
  tags: string[];
  hook_text: string;
  explication: string;
}

export const hooksData: Hook[] = [
  {
    id: 1,
    titre: "La Révélation inattendue",
    categorie: "Urgence & Peur de Manquer",
    secteur: "E-commerce",
    tags: ["stock", "limité", "crise"],
    hook_text: "Ceci est le dernier jour où ce produit sera disponible à ce prix. Regardez pourquoi.",
    explication: "Crée une pression artificielle sur l'audience. Idéal pour les lancements ou les déstockages."
  },
  {
    id: 2,
    titre: "L'Affirmation Choquante",
    categorie: "Autorité & Expertise",
    secteur: "Coaching & Bien-être",
    tags: ["santé", "vérité", "controversé"],
    hook_text: "Arrêtez de méditer pour trouver la paix intérieure. Faites plutôt ceci.",
    explication: "Commence par un conseil anti-intuitif pour capter l'attention. Suggère que l'audience a fait une erreur."
  },
  {
    id: 3,
    titre: "Le Secret dévoilé",
    categorie: "Curiosité & Mystère",
    secteur: "Marketing Digital",
    tags: ["secret", "découverte", "révélation"],
    hook_text: "Ce que les experts en marketing ne vous diront jamais sur les publicités Facebook.",
    explication: "Joue sur la curiosité en promettant une information exclusive que d'autres cachent."
  },
  {
    id: 4,
    titre: "La Transformation Rapide",
    categorie: "Résultat Immédiat",
    secteur: "Fitness",
    tags: ["résultat", "rapide", "transformation"],
    hook_text: "J'ai perdu 10kg en 30 jours sans aller à la salle de sport. Voici comment.",
    explication: "Met en avant un résultat concret et rapide avec une promesse de méthode simple."
  },
  {
    id: 5,
    titre: "L'Erreur Commune",
    categorie: "Problème & Solution",
    secteur: "Finance",
    tags: ["erreur", "économie", "conseil"],
    hook_text: "95% des gens font cette erreur avec leur argent. Ne soyez pas l'un d'eux.",
    explication: "Identifie une erreur courante et positionne le contenu comme la solution."
  },
  {
    id: 6,
    titre: "La Preuve Sociale",
    categorie: "Autorité & Expertise",
    secteur: "E-commerce",
    tags: ["témoignage", "preuve", "clients"],
    hook_text: "Plus de 10 000 clients nous font confiance. Découvrez pourquoi.",
    explication: "Utilise les chiffres et la preuve sociale pour établir la crédibilité."
  }
];
