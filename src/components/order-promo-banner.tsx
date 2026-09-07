import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Brand } from '@/constants/brands';
import { useAppTheme } from '@/context/theme-context';
import { hexToRgba } from '@/utils/color';

/**
 * Replaces the old interactive Delivery/Pickup/Eat-in cards on Home — the
 * real site doesn't have a per-section fulfillment picker, just an "Order
 * Online" CTA and a delivery promo line ("fast delivery right at your
 * doorstep"), so this mirrors that instead. The only place a fulfillment
 * choice is actually functional is the checkout sheet opened from Cart.
 */
export function OrderPromoBanner({ brand, accentColor }: { brand: Brand; accentColor: string }) {
  const router = useRouter();
  const { tokens } = useAppTheme();

  return (
    <View style={[styles.banner, { backgroundColor: hexToRgba(accentColor, 0.1), borderColor: hexToRgba(accentColor, 0.25) }]}>
      <View style={styles.headerRow}>
        <View style={[styles.iconWrap, { backgroundColor: accentColor }]}>
          <Ionicons name="bicycle" size={22} color="#fff" />
        </View>
        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: tokens.text }]}>Fast delivery, right to your doorstep</Text>
          <Text style={[styles.subtitle, { color: tokens.textSecondary }]}>Cooked fresh to order, every time.</Text>
        </View>
      </View>
      <Pressable style={[styles.cta, { backgroundColor: accentColor }]} onPress={() => router.push(`${brand.route}/menu` as never)}>
        <Text style={styles.ctaText}>Order Online</Text>
        <Ionicons name="arrow-forward" size={16} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { marginTop: 20, marginHorizontal: 16, borderRadius: 18, borderWidth: 1, padding: 16, gap: 14 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  textWrap: { flex: 1, gap: 2 },
  title: { fontSize: 15, fontWeight: '800' },
  subtitle: { fontSize: 12 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 999,
    paddingVertical: 12,
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
