import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandBanner } from '@/components/brand-banner';
import { BrandIcon } from '@/components/brand-icon';
import { FulfillmentOptions } from '@/components/fulfillment-options';
import { BRANDS, type BrandId } from '@/constants/brands';

export function BrandHomeScreen({ brandId }: { brandId: BrandId }) {
  const brand = BRANDS[brandId];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <BrandBanner brand={brand} photo={brand.heroPhoto} style={styles.hero} imageStyle={styles.heroImage}>
        <BrandIcon brand={brand} size={40} />
        <Text style={styles.heroTitle}>{brand.name}</Text>
        <Text style={styles.heroTagline}>{brand.tagline}</Text>
      </BrandBanner>

      <FulfillmentOptions accentColor={brand.colors.primary} />

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Menu coming soon</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { paddingBottom: 40 },
  hero: {
    margin: 16,
    borderRadius: 24,
    overflow: 'hidden',
    height: 200,
    justifyContent: 'flex-end',
    padding: 24,
    gap: 6,
  },
  heroImage: { borderRadius: 24 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  heroTagline: { color: 'rgba(255,255,255,0.85)', fontSize: 13 },
  placeholder: { alignItems: 'center', paddingVertical: 60 },
  placeholderText: { color: '#999', fontSize: 14 },
});
