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
  /**
   * Drop a real photo in `assets/images/brands/<id>.jpg` and set this to
   * `require('@/assets/images/brands/<id>.jpg')` to replace the gradient card
   * on the landing slider with a real background photo.
   */
  photo?: ImageSourcePropType;
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
  },
};

export const BRAND_LIST: Brand[] = [
  BRANDS.supermarket,
  BRANDS.pizza,
  BRANDS.chicken,
  BRANDS.coffee,
];
