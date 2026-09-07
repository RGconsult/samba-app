import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BRANDS, type BrandId } from '@/constants/brands';
import { MENU_ITEMS, type MenuItem } from '@/constants/menu-items';
import { useCart } from '@/context/cart-context';
import { useAppTheme } from '@/context/theme-context';
import { accentForTheme } from '@/utils/color';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_PADDING = 16;
const CARD_GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING * 2 - CARD_GAP) / 2;
const CARD_IMAGE_HEIGHT = CARD_WIDTH * 0.8;

function formatPrice(price: number) {
  return `RWF ${price.toLocaleString()}`;
}

export function BrandMenuScreen({ brandId }: { brandId: BrandId }) {
  const brand = BRANDS[brandId];
  const items = MENU_ITEMS[brandId];
  const { items: cartItems, addItem, incrementItem, decrementItem } = useCart();
  const { tokens, isDark } = useAppTheme();
  const accent = accentForTheme(brand.colors.primary, isDark);

  const categories = useMemo(() => ['All', ...new Set(items.map((item) => item.category))], [items]);
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredItems = activeCategory === 'All' ? items : items.filter((item) => item.category === activeCategory);

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryBar}
        style={[styles.categoryBarWrap, { borderBottomColor: tokens.border }]}>
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <Pressable
              key={category}
              onPress={() => setActiveCategory(category)}
              style={[
                styles.categoryPill,
                { borderColor: tokens.border },
                isActive && { backgroundColor: accent, borderColor: accent },
              ]}>
              <Text
                style={[styles.categoryPillText, { color: isActive ? '#fff' : tokens.text }]}
                numberOfLines={1}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        data={filteredItems}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const inCart = cartItems.find((c) => c.id === item.id);
          return (
            <ProductCard
              item={item}
              inCart={inCart}
              accent={accent}
              tokens={tokens}
              onAdd={() => addItem(item, brandId)}
              onIncrement={() => incrementItem(item.id)}
              onDecrement={() => decrementItem(item.id)}
            />
          );
        }}
      />
    </View>
  );
}

function ProductCard({
  item,
  inCart,
  accent,
  tokens,
  onAdd,
  onIncrement,
  onDecrement,
}: {
  item: MenuItem;
  inCart: { qty: number } | undefined;
  accent: string;
  tokens: ReturnType<typeof useAppTheme>['tokens'];
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <View style={[styles.card, { backgroundColor: tokens.surface, width: CARD_WIDTH }]}>
      <Image source={item.image} resizeMode="cover" style={{ width: CARD_WIDTH, height: CARD_IMAGE_HEIGHT }} />
      <View style={styles.cardBody}>
        <Text style={[styles.name, { color: tokens.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.description, { color: tokens.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={[styles.price, { color: accent }]}>{formatPrice(item.price)}</Text>

        {inCart ? (
          <View style={styles.stepper}>
            <Pressable onPress={onDecrement} style={[styles.stepperBtn, { borderColor: accent }]} hitSlop={8}>
              <Ionicons name="remove" size={16} color={accent} />
            </Pressable>
            <Text style={[styles.qty, { color: tokens.text }]}>{inCart.qty}</Text>
            <Pressable onPress={onIncrement} style={[styles.stepperBtn, { borderColor: accent }]} hitSlop={8}>
              <Ionicons name="add" size={16} color={accent} />
            </Pressable>
          </View>
        ) : (
          <Pressable style={[styles.addButton, { backgroundColor: accent }]} onPress={onAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  categoryBarWrap: { flexGrow: 0, flexShrink: 0, height: 62, borderBottomWidth: 1 },
  categoryBar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16 },
  categoryPill: {
    flexShrink: 0,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryPillText: { fontSize: 13, fontWeight: '600', lineHeight: 16 },
  grid: { padding: CONTAINER_PADDING, gap: CARD_GAP },
  gridRow: { gap: CARD_GAP },
  card: { borderRadius: 16, overflow: 'hidden' },
  cardBody: { padding: 12, gap: 4 },
  name: { fontSize: 14, fontWeight: '700' },
  description: { fontSize: 11, lineHeight: 15 },
  price: { fontSize: 14, fontWeight: '800', marginTop: 2 },
  addButton: { marginTop: 6, borderRadius: 999, paddingVertical: 9, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 6 },
  stepperBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { fontSize: 15, fontWeight: '700', minWidth: 16, textAlign: 'center' },
});
