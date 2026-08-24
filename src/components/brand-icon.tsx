import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import type { Brand } from '@/constants/brands';

const ICON_FAMILIES = { Ionicons, MaterialCommunityIcons } as const;

export function BrandIcon({
  brand,
  size = 20,
  color = '#ffffff',
}: {
  brand: Brand;
  size?: number;
  color?: string;
}) {
  const Icon = ICON_FAMILIES[brand.iconFamily] as any;
  return <Icon name={brand.iconName} size={size} color={color} />;
}
