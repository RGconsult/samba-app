import { StyleSheet, Text, View } from 'react-native';

import { BrandIcon } from '@/components/brand-icon';
import { BRAND_LIST, BRANDS, type BrandId } from '@/constants/brands';

/**
 * Header logo. With no brandId, renders a placeholder "Samba Rwanda" mark
 * (a dot per division + wordmark) for the landing screen. With a brandId, it
 * renders that division's placeholder mark instead. Swap either branch for
 * real logo artwork (e.g. an <Image>) once the files are available.
 */
export function BrandLogo({ brandId }: { brandId?: BrandId }) {
  if (!brandId) {
    return (
      <View style={styles.row}>
        <View style={styles.dotsRow}>
          {BRAND_LIST.map((brand) => (
            <View key={brand.id} style={[styles.dot, { backgroundColor: brand.colors.primary }]} />
          ))}
        </View>
        <Text style={styles.rwandaTitle}>
          <Text style={{ color: '#E23A36' }}>Samba</Text>
          <Text style={{ color: '#0E8C63' }}> Rwanda</Text>
        </Text>
      </View>
    );
  }

  const brand = BRANDS[brandId];
  return (
    <View style={styles.row}>
      <View style={[styles.badge, { backgroundColor: brand.colors.primary }]}>
        <BrandIcon brand={brand} size={16} />
      </View>
      <Text style={[styles.brandTitle, { color: brand.colors.primary }]}>{brand.shortName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dotsRow: { flexDirection: 'row', gap: 3 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  rwandaTitle: { fontSize: 18, fontWeight: '800', letterSpacing: 0.2 },
  badge: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  brandTitle: { fontSize: 17, fontWeight: '700' },
});
