import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandIcon } from '@/components/brand-icon';
import { FulfillmentOptions } from '@/components/fulfillment-options';
import { BRANDS, type BrandId } from '@/constants/brands';

export function BrandHomeScreen({ brandId }: { brandId: BrandId }) {
  const brand = BRANDS[brandId];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <LinearGradient colors={brand.colors.gradient} style={styles.hero}>
        <BrandIcon brand={brand} size={40} />
        <Text style={styles.heroTitle}>{brand.name}</Text>
        <Text style={styles.heroTagline}>{brand.tagline}</Text>
      </LinearGradient>

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
  hero: { margin: 16, borderRadius: 24, padding: 24, gap: 6 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  heroTagline: { color: 'rgba(255,255,255,0.85)', fontSize: 13 },
  placeholder: { alignItems: 'center', paddingVertical: 60 },
  placeholderText: { color: '#999', fontSize: 14 },
});
