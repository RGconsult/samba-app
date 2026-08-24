import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandCarousel } from '@/components/brand-carousel';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>KIBAGABAGA · KIGALI</Text>
          <Text style={styles.heading}>What are you in the mood for?</Text>
          <Text style={styles.subheading}>
            Order delivery, schedule a pickup, or find a spot to eat in.
          </Text>
        </View>
        <BrandCarousel />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111' },
  safeArea: { flex: 1 },
  intro: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 8, gap: 6 },
  eyebrow: { color: '#F2A413', fontSize: 12, fontWeight: '700', letterSpacing: 1.5 },
  heading: { color: '#fff', fontSize: 26, fontWeight: '800' },
  subheading: { color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 20 },
});
