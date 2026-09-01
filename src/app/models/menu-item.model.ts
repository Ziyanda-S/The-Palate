export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: 'Starters' | 'Mains' | 'Grill' | 'Desserts';
  icon: string;       // ionicon name used on the placeholder plate art
  accent: string;     // gradient accent used behind the plate art
  photoUrl?: string;
  isFavorite?: boolean;
  isSaved?: boolean;
}
