/** Textes exacts de la maquette v2 — page principale uniquement */
export const HOME_COPY = {
  nav: {
    home: 'Accueil',
    new: 'Nouvel article',
    listings: 'Annonces',
    stock: 'Mon stock',
    howItWorks: 'Comment ça marche',
    pricing: 'Tarifs',
    listingsBadge: 4,
    trials: '2 essais restants',
    themeToggle: 'Clair / Sombre',
    themeLight: 'Clair',
  },
  banner: {
    text: "Maquette v2 à valider. L'IA est simulée ici : dans la vraie appli elle analysera ta photo.",
    reset: 'Reset Démo',
  },
  hero: {
    badge: 'UNE PHOTO, PLUSIEURS SITES',
    titleLine1: 'Une photo.',
    titleLine2: 'Des annonces',
    titleLine3: 'prêtes.',
    subtitle:
      'La fiche se remplit, chaque site reçoit son texte, tu gardes la main sur la publication.',
    ctaPrimary: 'Ajouter un article',
    ctaSecondary: 'Comment ça marche',
  },
  widget: {
    header: 'TES ANNONCES, PRÊTES POUR',
    ready: '4/4 Prêtes',
    platforms: {
      vinted: 'Texte court & #hashtags',
      leboncoin: 'Localisation & remise propre',
      ebay: 'Keywords SEO & specs',
      marketplace: 'Direct messagerie & prix net',
    },
    footer: '⚡ Génération instantanée en 1 photo',
    tryCta: 'Essayer',
  },
  features: [
    {
      id: 'photo',
      title: 'Photo, fiche remplie',
      description: 'Titre, marque, taille et prix conseillé proposés.',
      badge: 'IA Vision',
      explore: 'Explorer →',
    },
    {
      id: 'texts',
      title: 'Un texte par site',
      description: 'Court sur Vinted, local sur Leboncoin, détaillé sur eBay.',
      badge: '4 formats',
      explore: 'Explorer →',
    },
    {
      id: 'profit',
      title: 'Bénéfice net',
      description: "Prix d'achat, frais, envoi : tu vois ce qu'il te reste.",
      badge: 'Calculateur',
      explore: 'Explorer →',
    },
    {
      id: 'safety',
      title: 'Compte protégé',
      description:
        "Tu publies toi-même : rien d'automatique, aucun risque pour ton compte.",
      badge: '100% conforme',
      explore: 'Explorer →',
    },
  ],
  footer: 'VP VendsPartout v2 — Une photo. Des annonces prêtes.',
} as const;

/** Soft Dark PLUS CLAIR */
export const SOFT_DARK = {
  bg: '#2A3544',
  bgAlt: '#323E50',
  card: '#3A4759',
  border: '#4A5A6E',
  text: '#F8FAFC',
  muted: '#A8B6C8',
  forest: '#0F5257',
  forestDeep: '#0B3C35',
} as const;
