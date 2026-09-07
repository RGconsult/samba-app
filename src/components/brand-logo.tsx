import { Image, StyleSheet, Text, View } from 'react-native';

import { BrandIcon } from '@/components/brand-icon';
import { BRANDS, type Brand, type BrandId } from '@/constants/brands';
import { useAppTheme } from '@/context/theme-context';
import { accentForTheme } from '@/utils/color';

const LOGO_HEIGHT = 32;

/** One division's real logo art at a given height, picking the dark-ink variant in dark mode when one exists. */
function BrandLogoImage({ brand, height, isDark }: { brand: Brand; height: number; isDark: boolean }) {
  const source = isDark && brand.logoDark ? brand.logoDark : brand.logo;
  if (!source) return null;
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={{ height, width: height * (brand.logoAspectRatio ?? 1), backgroundColor: 'transparent' }}
    />
  );
}

/**
 * Header logo, always pinned to the left. With no brandId (the landing
 * screen), renders the "Samba Rwanda" wordmark — "Samba" set in the same
 * flowing script style as the real division logos, "Rwanda" set as a bold
 * plain subtitle beside it, echoing how each real logo pairs a script
 * "Samba" with a plain bold word (PIZZA / CHICKEN / COFFEE). With a brandId,
 * it renders that division's own logo followed by its full name, or the
 * placeholder badge+text style for supermarket until its logo exists.
 */
export function BrandLogo({ brandId }: { brandId?: BrandId }) {
  const { isDark } = useAppTheme();

  if (!brandId) {
    const sambaColor = isDark ? '#F5ECDD' : '#2B2420';
    const rwandaColor = isDark ? '#F2BB55' : '#B87A1E';

    return (
      <Text style={styles.rwandaTitle} numberOfLines={1}>
        <Text style={[styles.sambaScript, { color: sambaColor }]}>Samba</Text>
        <Text style={[styles.rwandaSans, { color: rwandaColor }]}> Rwanda</Text>
      </Text>
    );
  }

  const brand = BRANDS[brandId];
  const accent = accentForTheme(brand.colors.primary, isDark);

  if (brand.logo) {
    return (
      <View style={styles.row}>
        <BrandLogoImage brand={brand} height={LOGO_HEIGHT} isDark={isDark} />
        <Text style={[styles.brandTitle, { color: accent }]} numberOfLines={1}>
          {brand.name}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={[styles.badge, { backgroundColor: brand.colors.primary }]}>
        <BrandIcon brand={brand} size={18} />
      </View>
      <Text style={[styles.brandTitle, { color: accent }]} numberOfLines={1}>
        {brand.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' },
  badge: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  brandTitle: { fontSize: 16, fontWeight: '700' },
  rwandaTitle: { alignSelf: 'flex-start' },
  sambaScript: { fontFamily: 'KaushanScript_400Regular', fontSize: 34 },
  rwandaSans: { fontSize: 18, fontWeight: '800', letterSpacing: 0.2 },
});
