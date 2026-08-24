import type { ImageSourcePropType } from 'react-native';

export type BrandId = 'supermarket' | 'pizza' | 'chicken' | 'coffee';

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
  /** Real logo artwork shown in the header once available; falls back to a placeholder mark when absent. */
  logo?: ImageSourcePropType;
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
    colors: { primary: '#D2232A', secondary: '#1C7C3B', gradient: ['#E23A36', '#7A0E13'] },
    photo: require('@/assets/images/pizza2.jpg'),
    heroPhoto: require('@/assets/images/pizza1.jpg'),
    logo: require('@/assets/images/Samba_Pizza_Logo_FINAL.png'),
    logoAspectRatio: 620 / 485,
  },
  chicken: {
    id: 'chicken',
    name: 'Samba Chicken',
    shortName: 'Chicken',
    tagline: 'Crispy, juicy, flame-grilled',
    route: '/chicken',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'food-drumstick',
    colors: { primary: '#C81E1E', secondary: '#F2A413', gradient: ['#2A2A2A', '#000000'] },
    photo: require('@/assets/images/chicken2.jpg'),
    heroPhoto: require('@/assets/images/chicken1.jpg'),
    logo: require('@/assets/images/Samba_Chicken_Logo_FINAL.png'),
    logoAspectRatio: 370 / 365,
  },
  coffee: {
    id: 'coffee',
    name: 'Samba Coffee',
    shortName: 'Coffee',
    tagline: 'Rich brews, roasted with care',
    route: '/coffee',
    iconFamily: 'Ionicons',
    iconName: 'cafe',
    colors: { primary: '#8B5A2B', secondary: '#E8A33D', gradient: ['#6B4423', '#3A2314'] },
    photo: require('@/assets/images/coffee1.jpg'),
    heroPhoto: require('@/assets/images/coffee2.jpg'),
    logo: require('@/assets/images/Samba_Coffee_Logo_FINAL.png'),
    logoAspectRatio: 411 / 335,
  },
};

export const BRAND_LIST: Brand[] = [
  BRANDS.supermarket,
  BRANDS.pizza,
  BRANDS.chicken,
  BRANDS.coffee,
];
