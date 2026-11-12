export type ProductCategory =
  | 'pepsi-drinks'
  | 'ice-creams'
  | 'masala-spices'
  | 'chips-snacks'
  | 'beans-rice-grains'
  | 'electrical-items'
  | 'mobile-topups-easypaisa'
  | 'household-essentials';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortDescription: string;
  image: string;
  imagePromptDescription?: string;
  itemCountNote: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  image: string;
  imagePromptDescription: string;
  description: string;
  isPopular?: boolean;
  inStock: boolean;
  brand?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethodType = 'cash-on-delivery' | 'easypaisa' | 'bank-transfer';

export interface CustomerOrderDetails {
  fullName: string;
  phone: string;
  address: string;
  nearbyLandmark?: string;
  cityArea: string;
  orderNotes?: string;
  paymentMethod: PaymentMethodType;
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerOrderDetails;
  paymentMethod: PaymentMethodType;
  status: 'Pending Verification' | 'Confirmed' | 'Dispatched' | 'Delivered';
}

export interface StoreConfig {
  storeName: string;
  tagline: string;
  locationArea: string;
  owners: {
    name1: string;
    name2: string;
  };
  announcementText: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  addressPlaceholder: string;
  openingHoursPlaceholder: string;
  deliveryNoticePlaceholder: string;
  deliveryFeePlaceholder: number;
  easypaisaTitle: string;
  easypaisaAccountPlaceholder: string;
  easypaisaInstructions: string;
  bankNamePlaceholder: string;
  bankAccountTitlePlaceholder: string;
  bankIbanPlaceholder: string;
  bankInstructions: string;
}

export type PageRoute =
  | 'home'
  | 'shop'
  | 'category'
  | 'about'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'privacy'
  | 'terms';
