import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandBanner } from '@/components/brand-banner';
import { BrandIcon } from '@/components/brand-icon';
import { OrderPromoBanner } from '@/components/order-promo-banner';
import { BRANDS, type BrandId } from '@/constants/brands';
import { MENU_ITEMS } from '@/constants/menu-items';
import { useAppTheme } from '@/context/theme-context';
import { accentForTheme } from '@/utils/color';

function formatPrice(price: number) {
  return `RWF ${price.toLocaleString()}`;
}

export function BrandHomeScreen({ brandId }: { brandId: BrandId }) {
  const brand = BRANDS[brandId];
  const router = useRouter();
  const { tokens, isDark } = useAppTheme();
  const accent = accentForTheme(brand.colors.primary, isDark);
  const popularItems = MENU_ITEMS[brandId].slice(0, 3);

  return (
    <ScrollView style={[styles.container, { backgroundColor: tokens.background }]} contentContainerStyle={styles.content}>
      <BrandBanner brand={brand} photo={brand.heroPhoto} style={styles.hero} imageStyle={styles.heroImage}>
        <BrandIcon brand={brand} size={40} />
        <Text style={styles.heroTitle}>{brand.name}</Text>
        <Text style={styles.heroTagline}>{brand.tagline}</Text>
      </BrandBanner>

      <OrderPromoBanner brand={brand} accentColor={accent} />

      <View style={styles.popularSection}>
        <View style={styles.popularHeader}>
          <Text style={[styles.popularTitle, { color: tokens.text }]}>Popular picks</Text>
          <Pressable
            style={styles.seeAllButton}
            onPress={() => router.push(`${brand.route}/menu` as never)}
            hitSlop={8}>
            <Text style={[styles.seeAllText, { color: accent }]}>See full menu</Text>
            <Ionicons name="arrow-forward" size={14} color={accent} />
          </Pressable>
        </View>

        {popularItems.map((item) => (
          <View key={item.id} style={[styles.itemRow, { backgroundColor: tokens.surface }]}>
            <Image source={item.image} resizeMode="cover" style={styles.itemThumb} />
            <View style={styles.itemText}>
              <Text style={[styles.itemName, { color: tokens.text }]}>{item.name}</Text>
              <Text style={[styles.itemDescription, { color: tokens.textSecondary }]}>{item.description}</Text>
            </View>
            <Text style={[styles.itemPrice, { color: accent }]}>{formatPrice(item.price)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  popularSection: { marginTop: 24, paddingHorizontal: 16, gap: 12 },
  popularHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  popularTitle: { fontSize: 17, fontWeight: '800' },
  seeAllButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  seeAllText: { fontSize: 13, fontWeight: '700' },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  itemThumb: { width: 44, height: 44, borderRadius: 12 },
  itemText: { flex: 1, gap: 2 },
  itemName: { fontSize: 15, fontWeight: '700' },
  itemDescription: { fontSize: 12 },
  itemPrice: { fontSize: 14, fontWeight: '700' },
});
