import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BrandBanner } from '@/components/brand-banner';
import { BrandIcon } from '@/components/brand-icon';
import { BRAND_LIST, type Brand } from '@/constants/brands';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AUTOPLAY_MS = 4500;

function SlideContent({ brand, onPress }: { brand: Brand; onPress: () => void }) {
  return (
    <View style={styles.cardContent}>
      <View style={styles.iconBadge}>
        <BrandIcon brand={brand} size={40} />
      </View>
      <Text style={styles.brandName}>{brand.name}</Text>
      <Text style={styles.tagline}>{brand.tagline}</Text>
      <Pressable style={styles.cta} onPress={onPress} hitSlop={8}>
        <Text style={[styles.ctaText, { color: brand.colors.primary }]}>Explore</Text>
        <Ionicons name="arrow-forward" size={16} color={brand.colors.primary} />
      </Pressable>
    </View>
  );
}

function Slide({ brand, onPress }: { brand: Brand; onPress: () => void }) {
  return (
    <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
      <BrandBanner brand={brand} photo={brand.photo} style={styles.card} imageStyle={styles.cardImage}>
        <SlideContent brand={brand} onPress={onPress} />
      </BrandBanner>
    </View>
  );
}

export function BrandCarousel() {
  const router = useRouter();
  const listRef = useRef<FlatList<Brand>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    listRef.current?.scrollToOffset({ offset: index * SCREEN_WIDTH, animated: true });
  }, []);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo((indexRef.current + 1) % BRAND_LIST.length);
    }, AUTOPLAY_MS);
  }, [goTo]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoplay]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    indexRef.current = index;
    setActiveIndex(index);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={listRef}
        data={BRAND_LIST}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onScrollBeginDrag={() => timerRef.current && clearInterval(timerRef.current)}
        onMomentumScrollEnd={(e) => {
          handleScroll(e);
          startAutoplay();
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Slide brand={item} onPress={() => router.push(item.route)} />
        )}
      />
      <View style={styles.dots}>
        {BRAND_LIST.map((brand, i) => (
          <Pressable key={brand.id} onPress={() => goTo(i)} hitSlop={8}>
            <View style={[styles.dot, i === activeIndex && styles.dotActive]} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  slide: { flex: 1, paddingHorizontal: 20, paddingVertical: 12 },
  card: { flex: 1, borderRadius: 28, overflow: 'hidden' },
  cardImage: { borderRadius: 28 },
  cardContent: { flex: 1, justifyContent: 'flex-end', padding: 28 },
  iconBadge: {
    position: 'absolute',
    top: 0,
    left: 28,
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: { fontSize: 30, fontWeight: '800', color: '#fff', marginBottom: 6 },
  tagline: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 20 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  ctaText: { fontWeight: '700', fontSize: 14 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { backgroundColor: '#fff', width: 22 },
});
