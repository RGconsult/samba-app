import { Stack } from 'expo-router';

import { BrandLogo } from '@/components/brand-logo';
import { BRANDS, type BrandId } from '@/constants/brands';

/** Shared Stack config for a division's screens: keeps its logo/color in the header everywhere within it. */
export function BrandStackLayout({ brandId }: { brandId: BrandId }) {
  const brand = BRANDS[brandId];

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: brand.colors.primary,
        headerTitle: () => <BrandLogo brandId={brandId} />,
        headerTitleAlign: 'left',
        headerShadowVisible: true,
        contentStyle: { backgroundColor: '#fafafa' },
      }}
    />
  );
}
