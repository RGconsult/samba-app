import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandCarousel } from '@/components/brand-carousel';
import { BrandIcon } from '@/components/brand-icon';
import { BRAND_LIST } from '@/constants/brands';
import { useAppTheme } from '@/context/theme-context';
import { accentForTheme } from '@/utils/color';

export default function LandingScreen() {
  const router = useRouter();
  const { isDark, tokens } = useAppTheme();
  const eyebrowColor = isDark ? '#F2BB55' : '#B87A1E';

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.intro}>
          <Text style={[styles.eyebrow, { color: eyebrowColor }]}>KIBAGABAGA · KIGALI</Text>
          <View style={styles.serviceList}>
            {BRAND_LIST.map((brand) => {
              const accent = accentForTheme(brand.colors.primary, isDark);
              return (
                <Pressable
                  key={brand.id}
                  style={[styles.servicePill, { borderColor: accent, backgroundColor: tokens.surface }]}
                  onPress={() => router.push(brand.route)}
                  hitSlop={4}>
                  <BrandIcon brand={brand} size={15} color={accent} />
                  <Text style={[styles.servicePillText, { color: accent }]}>{brand.shortName}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <BrandCarousel />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  intro: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 8, gap: 12 },
  eyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 1.5 },
  serviceList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  servicePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  servicePillText: { fontSize: 13, fontWeight: '700' },
});
