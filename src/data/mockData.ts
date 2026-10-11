import { PlatformConfig, Item, PricingPlan } from '../types';

export const PLATFORMS: PlatformConfig[] = [
  {
    id: 'vinted',
    name: 'Vinted',
    shortName: 'Vinted',
    letter: 'V',
    color: '#007782',
    bgBadge: 'bg-[#007782]',
    borderBadge: 'border-[#007782]/30',
    iconBg: 'bg-[#007782]',
    textColor: 'text-[#007782]',
    sellerFeePercent: 0,
    fixedFee: 0,
    buyerProtection: '0% de frais vendeur (payé par l\'acheteur)',
    styleDescription: 'Texte court, direct, hashtags ciblés (#vintage #y2k), remise sur les lots.',
    appDeepLink: 'https://www.vinted.fr'
  },
  {
    id: 'leboncoin',
    name: 'Leboncoin',
    shortName: 'Leboncoin',
    letter: 'L',
    color: '#F56B2A',
    bgBadge: 'bg-[#F56B2A]',
    borderBadge: 'border-[#F56B2A]/30',
    iconBg: 'bg-[#F56B2A]',
    textColor: 'text-[#F56B2A]',
    sellerFeePercent: 0,
    fixedFee: 0,
    buyerProtection: 'Remise en main propre ou envoi sécurisé',
    styleDescription: 'Local, chaleureux, mention remise en main propre possible et paiement sécurisé.',
    appDeepLink: 'https://www.leboncoin.fr'
  },
  {
    id: 'ebay',
    name: 'eBay',
    shortName: 'eBay',
    letter: 'e',
    color: '#0064D2',
    bgBadge: 'bg-[#0064D2]',
    borderBadge: 'border-[#0064D2]/30',
    iconBg: 'bg-[#0064D2]',
    textColor: 'text-[#0064D2]',
    sellerFeePercent: 10,
    fixedFee: 0.35,
    buyerProtection: 'Protection eBay & acheteurs internationaux',
    styleDescription: 'Titre optimisé mots-clés, état technique précis, dimensions et envoi suivi.',
    appDeepLink: 'https://www.ebay.fr'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    shortName: 'Marketplace',
    letter: 'f',
    color: '#1877F2',
    bgBadge: 'bg-[#1877F2]',
    borderBadge: 'border-[#1877F2]/30',
    iconBg: 'bg-[#1877F2]',
    textColor: 'text-[#1877F2]',
    sellerFeePercent: 0,
    fixedFee: 0,
    buyerProtection: 'Vente directe de proximité',
    styleDescription: 'Format direct pour messagerie, localisation, prix net sans négociation abusive.',
    appDeepLink: 'https://www.facebook.com/marketplace'
  }
];

export const PRESET_ITEMS: Omit<Item, 'id' | 'createdAt' | 'status'>[] = [
  {
    title: 'Veste Bomber Nike Vintage 90s',
    brand: 'Nike',
    category: 'vetements-homme',
    categoryLabel: 'Mode Homme > Vestes & Manteaux',
    size: 'L',
    color: 'Kaki & Bleu marine',
    condition: 'Très bon état',
    suggestedPrice: 48,
    purchasePrice: 12,
    shippingEstimate: 4.5,
    photos: [
      'https://images.pexels.com/photos/10807231/pexels-photo-10807231.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/3649765/pexels-photo-3649765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ],
    aiConfidence: 98,
    detectedFeatures: [
      'Logo Nike brodé poitrine & dos',
      'Fermeture éclair YKK d\'origine',
      'Doublure thermique impeccable',
      'Style Streetwear / Retro 90s'
    ],
    listings: {
      vinted: {
        platform: 'vinted',
        title: 'Veste bomber Nike vintage 90s brodé kaki - Taille L',
        description: `✨ Superbe veste bomber Nike vintage années 90 en très bon état !

- Marque : Nike (authentique vintage)
- Taille : L (coupe oversized très stylée)
- Couleur : Kaki avec détails bleu marine
- État : Très bon état, fermeture éclair YKK fluide, pas de trou ni tache
- Écusson brodé Nike sur le torse

📦 Envoi soigné sous 24h via Mondial Relay / Relais Colis
🎁 Réduction activée sur les lots ! N'hésite pas à regarder mon dressing.

#nike #nikevintage #bomber #streetwear #vintage90s #y2k #vestenike`,
        price: 48,
        tags: ['#nike', '#nikevintage', '#bomber', '#streetwear', '#vintage90s'],
        tips: 'Les vestes Nike 90s se vendent très vite en soirée entre 19h et 22h sur Vinted.',
        estimatedFee: 0,
        netProfit: 36
      },
      leboncoin: {
        platform: 'leboncoin',
        title: 'Veste bomber Nike vintage originale taille L',
        description: `Bonjour,

Je vends cette authentique veste bomber Nike vintage des années 90, en très bon état de conservation.

Caractéristiques :
- Taille : L
- Coloris : Kaki et finitions marine
- Fermeture éclair en parfait état
- Vêtement propre, non-fumeur, lavé avec soin

Remise en main propre possible sur Lyon et environs (paiement espèces ou sécurisé) ou envoi rapide via le paiement sécurisé Leboncoin.

N'hésitez pas à me contacter si vous avez des questions ou souhaitez des photos complémentaires.`,
        price: 48,
        tags: ['Veste Nike', 'Bomber', 'Vintage', 'Mode homme L'],
        tips: 'Mentionne ton quartier ou ta station de métro pour favoriser les remises en mains propres rapides.',
        estimatedFee: 0,
        netProfit: 36
      },
      ebay: {
        platform: 'ebay',
        title: 'Veste Bomber Nike Vintage 90s Embroidered Logo Jacket Retro Kaki - Size L',
        description: `AUTHENTIQUE VESTE BOMBER NIKE VINTAGE ANNEES 90

Description de l'article :
- Marque : NIKE
- Époque : Vintage 1990s
- Taille indiquée : L (Large)
- Mesures à plat : Aisselle à aisselle : 62 cm | Longueur totale : 68 cm | Longueur manche : 64 cm
- Matière : Polyester technique respirant
- État général : 8.5/10 - Très bon état vintage, légères traces d'usage normales conformes à l'âge, aucune déchirure.

Expédition & Livraison :
- Envoi rapide sous 24h ouvrées
- Colissimo suivi avec numéro de traçabilité ou Mondial Relay
- Emballage renforcé sous film étanche
- Retours acceptés sous 14 jours (frais à la charge de l'acheteur)`,
        price: 52,
        tags: ['Nike Vintage Jacket', 'Bomber 90s', 'Retro Streetwear', 'Nike Embroidered'],
        tips: 'Le prix sur eBay inclut 4€ de marge supplémentaire pour couvrir les frais de transaction.',
        estimatedFee: 5.55,
        netProfit: 34.45
      },
      marketplace: {
        platform: 'marketplace',
        title: 'Veste bomber Nike vintage 90s - Taille L (État impeccable)',
        description: `Vends veste bomber Nike vintage authentique.
Taille L, couleur kaki.
Très bon état, fermetures nickel.
Prix : 48 € (prix ferme et justifié).
Disponible de suite en centre-ville ou envoi possible. Premier arrivé, premier servi !`,
        price: 48,
        tags: ['Nike', 'Bomber', 'Veste L'],
        tips: 'Sur Marketplace, précisez toujours "Prix ferme" pour éviter les offres à moitié prix.',
        estimatedFee: 0,
        netProfit: 36
      }
    }
  },
  {
    title: 'Sneakers New Balance 574 Daim Gris',
    brand: 'New Balance',
    category: 'chaussures',
    categoryLabel: 'Chaussures > Baskets & Sneakers',
    size: '42.5 EU',
    color: 'Gris anthracite / Blanc',
    condition: 'Très bon état',
    suggestedPrice: 65,
    purchasePrice: 20,
    shippingEstimate: 5.0,
    photos: [
      'https://images.pexels.com/photos/30755567/pexels-photo-30755567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/19882430/pexels-photo-19882430.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ],
    aiConfidence: 99,
    detectedFeatures: [
      'Empiècements en daim véritable',
      'Semelle ENCAP amortissante intacte',
      'Lacets blancs d\'origine',
      'Semelle extérieure peu usée'
    ],
    listings: {
      vinted: {
        platform: 'vinted',
        title: 'Baskets New Balance 574 en daim gris - Pointure 42.5',
        description: `👟 New Balance 574 iconiques en daim gris clair et détails blancs.

- Pointure : 42.5 EU / 9 US (taille normalement)
- Matière : Cuir suédé / daim véritable et mesh
- État : Très bon état, semelle intérieure nettoyée, peu portées
- Confort : Technologie ENCAP ultra-confortable

📦 Envoi sous 24h avec protection bulles.
✨ N'hésitez pas pour toute question !

#newbalance #nb574 #sneakers #daim #baskets42 #streetwear`,
        price: 65,
        tags: ['#newbalance', '#nb574', '#sneakers', '#baskets', '#daim'],
        tips: 'Mets en avant la pointure exacte en EU et US dans le premier paragraphe.',
        estimatedFee: 0,
        netProfit: 45
      },
      leboncoin: {
        platform: 'leboncoin',
        title: 'Chaussures New Balance 574 daim gris T42.5 très bon état',
        description: `Bonjour,

À vendre paire de New Balance 574 originales en daim gris et textile respirant.
- Pointure 42.5
- Semelle amortissante ENCAP
- Portées une dizaine de fois, semelle extérieure non usée, propres et soignées.

Possibilité d'essai sur place lors de la remise en main propre. Envoi Leboncoin sécurisé disponible.`,
        price: 65,
        tags: ['New Balance 574', 'Baskets 42.5', 'Sneakers homme'],
        tips: 'Précise si la semelle est amovible ou si tu as la boîte d\'origine.',
        estimatedFee: 0,
        netProfit: 45
      },
      ebay: {
        platform: 'ebay',
        title: 'New Balance 574 Grey Suede Mesh Classic Sneakers Trainers EU 42.5 US 9',
        description: `NEW BALANCE 574 CLASSIC GREY SUEDE

Item Specifications:
- Brand: New Balance
- Model: 574 Core
- Size: EU 42.5 / US 9 / UK 8.5
- Colorway: Marblehead Grey / White
- Condition: 8.5/10 Pre-owned in great condition. Minimal heel drag, clean uppers.
- Shipped securely in a sturdy replacement box with tracked parcel service.`,
        price: 70,
        tags: ['New Balance 574', 'Grey Suede', 'Trainers 42.5', 'Classic Runners'],
        tips: 'Sur eBay, le titre en anglais attire les acheteurs européens (Allemagne, UK, Italie).',
        estimatedFee: 7.35,
        netProfit: 42.65
      },
      marketplace: {
        platform: 'marketplace',
        title: 'New Balance 574 daim gris T42.5 - Super état',
        description: `Baskets New Balance 574 grises pointure 42.5.
Très bon état général, daim propre, semelle nickel.
65 € en espèces ou virement sécurisé. Remise en mains propres privilégiée.`,
        price: 65,
        tags: ['New Balance', 'Baskets 42.5'],
        tips: 'Les sneakers partent en moins de 48h sur Marketplace si le prix est sous les 70€.',
        estimatedFee: 0,
        netProfit: 45
      }
    }
  },
  {
    title: 'Sac à Main Vintage Cuir Marron Cognac',
    brand: 'Artisanat Cuir Vintage',
    category: 'maroquinerie',
    categoryLabel: 'Maroquinerie > Sacs à main',
    size: 'Moyen (28x20x8 cm)',
    color: 'Marron Cognac',
    condition: 'Très bon état',
    suggestedPrice: 55,
    purchasePrice: 15,
    shippingEstimate: 4.8,
    photos: [
      'https://images.pexels.com/photos/4452386/pexels-photo-4452386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/27174573/pexels-photo-27174573.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ],
    aiConfidence: 96,
    detectedFeatures: [
      'Cuir véritable épais pleine fleur',
      'Patine naturelle vintage authentique',
      'Bandoulière réglable',
      'Bouclerie en laiton vieilli'
    ],
    listings: {
      vinted: {
        platform: 'vinted',
        title: 'Sac bandoulière vintage en cuir véritable marron cognac',
        description: `🤎 Coup de cœur pour ce magnifique sac vintage en cuir véritable !

- Couleur : Marron cognac avec une superbe patine
- Matière : Cuir épais de grande qualité
- Fermeture par boucle en laiton + zip intérieur sécurisé
- Bandoulière réglable pour porté épaule ou crossbody
- Dimensions : 28 x 20 x 8 cm (format idéal quotidien)

📦 Envoi rapide et très bien protégé sous papier de soie et carton.

#sacvintage #cuirveritable #sacencuir #cognac #bohochic #retrochic`,
        price: 55,
        tags: ['#sacvintage', '#cuirveritable', '#sacencuir', '#cognac', '#bohochic'],
        tips: 'Mentionne les dimensions précises pour éviter les questions récurrentes en message privé.',
        estimatedFee: 0,
        netProfit: 40
      },
      leboncoin: {
        platform: 'leboncoin',
        title: 'Sac à main bandoulière vintage cuir marron véritable',
        description: `Bonjour,

Je propose ce très joli sac à main en cuir marron vintage façon maroquinier.
Cuir robuste et souple avec une belle teinte cognac patinée par le temps.
Plusieurs compartiments intérieurs fonctionnels.
Idéal look bohème chic ou rétro.

Remise en main propre ou envoi soigné à votre convenance.`,
        price: 55,
        tags: ['Sac cuir', 'Sac vintage', 'Maroquinerie', 'Marron cognac'],
        tips: 'Mets une photo en lumière naturelle pour bien faire ressortir la couleur du cuir.',
        estimatedFee: 0,
        netProfit: 40
      },
      ebay: {
        platform: 'ebay',
        title: 'Sac Besace Vintage Cuir Marron Cognac Bandoulière Véritable Cuir Vintage Bag',
        description: `MAGNIFIQUE SAC BESACE VINTAGE EN CUIR VERITABLE PLEINE FLEUR

Détails de la pièce :
- Matière : 100% Cuir pleine fleur
- Teinte : Marron Cognac / Tabac
- Fermoirs : Bouclerie laiton patiné
- Intérieur : Doublure textile propre, poche zippée
- Dimensions : Largeur 28 cm x Hauteur 20 cm x Profondeur 8 cm
- État : Très bon état vintage, magnifique patine d'époque sans accroc.

Emballage professionnel soigné et expédition rapide avec numéro de suivi.`,
        price: 59,
        tags: ['Sac cuir vintage', 'Leather crossbody bag', 'Besace marron', 'Cuir cognac'],
        tips: 'Les pièces en cuir vintage ont une forte valeur perçue sur eBay chez les collectionneurs.',
        estimatedFee: 6.25,
        netProfit: 37.75
      },
      marketplace: {
        platform: 'marketplace',
        title: 'Sac bandoulière en vrai cuir marron vintage (Superbe état)',
        description: `Sac en vrai cuir marron patiné avec bandoulière réglable.
Format très pratique, super état général.
Prix : 55 € ferme. Visible en centre-ville ou expédition possible.`,
        price: 55,
        tags: ['Sac cuir', 'Vintage'],
        tips: 'Précise "Vrai cuir" dans le titre pour te démarquer des imitations synthétiques.',
        estimatedFee: 0,
        netProfit: 40
      }
    }
  }
];

export const INITIAL_ITEMS: Item[] = [
  {
    id: 'item-1',
    title: 'Veste Bomber Nike Vintage 90s',
    brand: 'Nike',
    category: 'vetements-homme',
    categoryLabel: 'Mode Homme > Vestes & Manteaux',
    size: 'L',
    color: 'Kaki & Bleu marine',
    condition: 'Très bon état',
    suggestedPrice: 48,
    purchasePrice: 12,
    shippingEstimate: 4.5,
    photos: [
      'https://images.pexels.com/photos/10807231/pexels-photo-10807231.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/3649765/pexels-photo-3649765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ],
    status: 'active',
    createdAt: 'Il y a 2 heures',
    aiConfidence: 98,
    detectedFeatures: [
      'Logo Nike brodé poitrine & dos',
      'Fermeture éclair YKK d\'origine',
      'Doublure thermique impeccable'
    ],
    listings: PRESET_ITEMS[0].listings
  },
  {
    id: 'item-2',
    title: 'Sneakers New Balance 574 Daim Gris',
    brand: 'New Balance',
    category: 'chaussures',
    categoryLabel: 'Chaussures > Baskets & Sneakers',
    size: '42.5 EU',
    color: 'Gris anthracite / Blanc',
    condition: 'Très bon état',
    suggestedPrice: 65,
    purchasePrice: 20,
    shippingEstimate: 5.0,
    photos: [
      'https://images.pexels.com/photos/30755567/pexels-photo-30755567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ],
    status: 'sold',
    soldPrice: 65,
    soldPlatform: 'vinted',
    soldDate: 'Hier',
    createdAt: 'Il y a 2 jours',
    aiConfidence: 99,
    detectedFeatures: [
      'Empiècements en daim véritable',
      'Semelle ENCAP amortissante intacte'
    ],
    listings: PRESET_ITEMS[1].listings
  },
  {
    id: 'item-3',
    title: 'Sac à Main Vintage Cuir Marron Cognac',
    brand: 'Artisanat Cuir Vintage',
    category: 'maroquinerie',
    categoryLabel: 'Maroquinerie > Sacs à main',
    size: 'Moyen (28x20x8 cm)',
    color: 'Marron Cognac',
    condition: 'Très bon état',
    suggestedPrice: 55,
    purchasePrice: 15,
    shippingEstimate: 4.8,
    photos: [
      'https://images.pexels.com/photos/4452386/pexels-photo-4452386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ],
    status: 'active',
    createdAt: 'Il y a 3 jours',
    aiConfidence: 96,
    detectedFeatures: [
      'Cuir véritable épais pleine fleur',
      'Patine naturelle vintage'
    ],
    listings: PRESET_ITEMS[2].listings
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'pack-10',
    name: 'Pack 10 Annonces',
    price: '2,99 €',
    priceValue: 2.99,
    badge: 'Idéal occasionnel',
    description: 'Parfait pour vider ton dressing ou vendre quelques pépites sans abonnement.',
    features: [
      '10 fiches complètes générées par IA',
      '4 textes optimisés par annonce (Vinted, LBC, eBay, Marketplace)',
      'Calcul automatique du bénéfice net',
      'Copie en 1 clic sans risque de ban',
      'Valable à vie sans date limite'
    ],
    ctaText: 'Prendre le Pack 10'
  },
  {
    id: 'pass-illimite',
    name: 'Pass Illimité',
    price: '7,99 €',
    priceValue: 7.99,
    period: '/ mois',
    badge: '⭐ Le plus populaire',
    popular: true,
    description: 'Pour les vendeurs réguliers qui veulent gagner un temps précieux et maximiser leurs marges.',
    features: [
      'Annonces & scans IA ILLIMITÉS',
      'Génération simultanée pour 4 plateformes',
      'Optimisation SEO des titres et mots-clés',
      'Gestionnaire de stock & calcul des bénéfices nets réels',
      'Détourage et amélioration automatique des photos par IA',
      'Accès prioritaire aux nouvelles plateformes (Depop, Vestiaire Co.)',
      'Sans engagement, résiliable à tout moment en 1 clic'
    ],
    ctaText: 'Démarrer avec l\'Illimité'
  },
  {
    id: 'pro-reseller',
    name: 'Pass Pro Reseller',
    price: '19,99 €',
    priceValue: 19.99,
    period: '/ mois',
    badge: 'Friperies & Pros',
    description: 'La solution ultime pour les semi-pros, friperies et revendeurs avec gros volume.',
    features: [
      'Tout le Pass Illimité inclus',
      'Scan par lot (jusqu\'à 20 articles d\'affilée)',
      'Export comptable CSV & facture automatique',
      'Historique des prix du marché en temps réel',
      'Support prioritaire WhatsApp 7j/7',
      'Multi-comptes et gestion d\'équipe'
    ],
    ctaText: 'Devenir Pro Reseller'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '1',
    icon: 'camera',
    title: 'Prends une photo',
    description: 'Prends une photo nette de ton vêtement ou objet avec l\'appareil de ton smartphone, ou choisis une image de ta galerie.'
  },
  {
    step: '2',
    icon: 'sparkles',
    title: 'L\'IA analyse et rédige',
    description: 'Notre intelligence artificielle identifie la marque, le modèle, la taille, l\'état et génère 4 descriptions sur-mesure adaptées à chaque site.'
  },
  {
    step: '3',
    icon: 'copy',
    title: 'Tu copies et publies en 1 clic',
    description: 'Un clic pour copier le titre et le texte optimisé, un clic pour ouvrir Vinted ou Leboncoin. Tu gardes 100% le contrôle sans aucun risque.'
  }
];

export const SAFETY_POINTS = [
  {
    title: 'Zéro risque de blocage ou de ban',
    description: 'Les robots d\'automatisation automatique sont interdits par Vinted et Leboncoin et mènent au bannissement. VendsPartout prépare tout et te laisse appuyer sur publier : 100% conforme aux CGU.'
  },
  {
    title: 'Aucun mot de passe requis',
    description: 'Tu ne nous donnes jamais tes identifiants ou accès bancaires de tes comptes Vinted, Leboncoin ou eBay.'
  },
  {
    title: 'Tu gardes la main sur les prix',
    description: 'L\'IA te conseille un prix basé sur les ventes récentes, mais tu peux le modifier à tout moment avant de copier.'
  }
];
