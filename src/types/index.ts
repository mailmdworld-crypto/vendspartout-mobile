export type PlatformId = 'vinted' | 'leboncoin' | 'ebay' | 'marketplace';

export type ItemStatus = 'draft' | 'active' | 'sold';

export type ItemCategory = 
  | 'vetements-homme' 
  | 'vetements-femme' 
  | 'chaussures' 
  | 'maroquinerie' 
  | 'jeux-video' 
  | 'maison-deco' 
  | 'autre';

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  shortName: string;
  letter: string;
  color: string;
  bgBadge: string;
  borderBadge: string;
  iconBg: string;
  textColor: string;
  sellerFeePercent: number; // e.g., 0 for Vinted, 10 for eBay
  fixedFee: number;
  buyerProtection: string;
  styleDescription: string;
  appDeepLink: string;
}

export interface PlatformListingData {
  platform: PlatformId;
  title: string;
  description: string;
  price: number;
  tags: string[];
  tips: string;
  estimatedFee: number;
  netProfit: number;
}

export interface Item {
  id: string;
  title: string;
  brand: string;
  category: ItemCategory;
  categoryLabel: string;
  size?: string;
  color?: string;
  condition: 'Neuf avec étiquette' | 'Très bon état' | 'Bon état' | 'Satisfaisant';
  suggestedPrice: number;
  purchasePrice: number;
  shippingEstimate: number;
  photos: string[];
  status: ItemStatus;
  soldPrice?: number;
  soldPlatform?: PlatformId;
  soldDate?: string;
  createdAt: string;
  listings: Record<PlatformId, PlatformListingData>;
  aiConfidence?: number;
  detectedFeatures?: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  period?: string;
  badge?: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface UserStats {
  freeCreditsRemaining: number;
  maxFreeCredits: number;
  isPro: boolean;
  totalArticles: number;
  totalSold: number;
  totalRevenue: number;
  totalProfit: number;
}

export type ActiveTab = 'home' | 'new' | 'listings' | 'stock' | 'how-it-works' | 'pricing';
