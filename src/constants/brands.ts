import type { ImageSourcePropType } from 'react-native';

export type BrandId = 'supermarket' | 'pizza' | 'chicken' | 'burger' | 'snacks' | 'salad' | 'coffee' | 'drinks';

export interface Brand {
  id: BrandId;
  name: string;
  shortName: string;
  tagline: string;
  route: `/${BrandId}`;
  iconFamily: 'Ionicons' | 'MaterialCommunityIcons';
  iconName: string;
  colors: {
    primary: string;
    secondary: string;
    gradient: [string, string];
  };
  /** Background photo for this brand's card on the landing slider. */
  photo?: ImageSourcePropType;
  /** Background photo for the hero banner on this brand's own home screen. */
  heroPhoto?: ImageSourcePropType;
  /** Real logo artwork (background removed) shown in the header once available; falls back to a placeholder mark when absent. */
  logo?: ImageSourcePropType;
  /** Same artwork with its dark ink swapped to light gray, for legibility on a dark-mode header. Omit if the logo has no dark ink to swap. */
  logoDark?: ImageSourcePropType;
  /** width / height of `logo`, used to size it without distorting it. */
  logoAspectRatio?: number;
}

export const BRANDS: Record<BrandId, Brand> = {
  supermarket: {
    id: 'supermarket',
    name: 'Samba Supermarket',
    shortName: 'Supermarket',
    tagline: 'Fresh groceries & everyday essentials',
    route: '/supermarket',
    iconFamily: 'Ionicons',
    iconName: 'cart',
    colors: { primary: '#0B6E4F', secondary: '#F2A413', gradient: ['#0E8C63', '#0A4A34'] },
    photo: require('@/assets/images/supermarket1.jpg'),
    heroPhoto: require('@/assets/images/supermarket2.jpg'),
  },
  pizza: {
    id: 'pizza',
    name: 'Samba Pizza',
    shortName: 'Pizza',
    tagline: 'Wood-fired pizza, made fresh',
    route: '/pizza',
    iconFamily: 'Ionicons',
    iconName: 'pizza',
    colors: { primary: '#D2232A', secondary: '#0B7A3E', gradient: ['#E23A36', '#7A0E13'] },
    photo: require('@/assets/images/pizza2.jpg'),
    heroPhoto: require('@/assets/images/pizza1.jpg'),
    logo: require('@/assets/images/Samba_Pizza_Logo_Transparent.png'),
    logoDark: require('@/assets/images/Samba_Pizza_Logo_Transparent_Dark.png'),
    logoAspectRatio: 313 / 252,
  },
  chicken: {
    id: 'chicken',
    name: 'Samba Chicken',
    shortName: 'Chicken',
    tagline: 'Crispy, juicy, flame-grilled',
    route: '/chicken',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'food-drumstick',
    colors: { primary: '#D0302A', secondary: '#F2A413', gradient: ['#2A2A2A', '#000000'] },
    photo: require('@/assets/images/chicken2.jpg'),
    heroPhoto: require('@/assets/images/chicken1.jpg'),
    logo: require('@/assets/images/Samba_Chicken_Logo_Transparent.png'),
    logoDark: require('@/assets/images/Samba_Chicken_Logo_Transparent_Dark.png'),
    logoAspectRatio: 259 / 252,
  },
  burger: {
    id: 'burger',
    name: 'Samba Burger',
    shortName: 'Burger',
    tagline: 'Juicy burgers, stacked high',
    route: '/burger',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'hamburger',
    colors: { primary: '#D9720A', secondary: '#7A3B12', gradient: ['#E88A2E', '#7A3B12'] },
    photo: require('@/assets/images/burger1.jpg'),
    heroPhoto: require('@/assets/images/burger2.jpg'),
  },
  snacks: {
    id: 'snacks',
    name: 'Samba Snacks',
    shortName: 'Snacks',
    tagline: 'Crispy bites & fries',
    route: '/snacks',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'french-fries',
    colors: { primary: '#C2860A', secondary: '#7A5200', gradient: ['#F2B705', '#7A5200'] },
    photo: require('@/assets/images/snacks1.jpg'),
    heroPhoto: require('@/assets/images/snacks2.jpg'),
  },
  salad: {
    id: 'salad',
    name: 'Samba Salad',
    shortName: 'Salad',
    tagline: 'Fresh, light, and healthy',
    route: '/salad',
    iconFamily: 'Ionicons',
    iconName: 'nutrition-outline',
    colors: { primary: '#4C9A2A', secondary: '#8BC34A', gradient: ['#66BB44', '#2E5E1A'] },
    photo: require('@/assets/images/salad1.jpg'),
    heroPhoto: require('@/assets/images/salad2.jpg'),
  },
  coffee: {
    id: 'coffee',
    name: 'Samba Coffee',
    shortName: 'Coffee',
    tagline: 'Rich brews, roasted with care',
    route: '/coffee',
    iconFamily: 'Ionicons',
    iconName: 'cafe',
    colors: { primary: '#4A1512', secondary: '#EFA030', gradient: ['#5C1B16', '#2A0C0A'] },
    photo: require('@/assets/images/coffee1.jpg'),
    heroPhoto: require('@/assets/images/coffee2.jpg'),
    logo: require('@/assets/images/Samba_Coffee_Logo_Transparent.png'),
    logoAspectRatio: 302 / 252,
  },
  drinks: {
    id: 'drinks',
    name: 'Samba Drinks',
    shortName: 'Drinks',
    tagline: 'Cool down with something refreshing',
    route: '/drinks',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'bottle-soda-classic-outline',
    colors: { primary: '#1189B5', secondary: '#5FD3E3', gradient: ['#22A6D9', '#0B4E66'] },
    photo: require('@/assets/images/drinks1.jpg'),
    heroPhoto: require('@/assets/images/drinks2.jpg'),
  },
};

export const BRAND_LIST: Brand[] = [
  BRANDS.supermarket,
  BRANDS.pizza,
  BRANDS.chicken,
  BRANDS.burger,
  BRANDS.snacks,
  BRANDS.salad,
  BRANDS.coffee,
  BRANDS.drinks,
];
