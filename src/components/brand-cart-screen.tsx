import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { FulfillmentOptions } from '@/components/fulfillment-options';
import { BRANDS, type BrandId } from '@/constants/brands';
import { FULFILLMENT_METHODS } from '@/constants/fulfillment';
import { useCart } from '@/context/cart-context';
import { useFulfillment } from '@/context/fulfillment-context';
import { useAppTheme, type ThemeTokens } from '@/context/theme-context';
import { accentForTheme } from '@/utils/color';

function formatPrice(price: number) {
  return `RWF ${price.toLocaleString()}`;
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  tokens,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'phone-pad' | 'number-pad';
  tokens: ThemeTokens;
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, { color: tokens.textSecondary }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.textSecondary}
        keyboardType={keyboardType}
        style={[styles.fieldInput, { color: tokens.text, borderColor: tokens.border, backgroundColor: tokens.background }]}
      />
    </View>
  );
}

export function BrandCartScreen({ brandId }: { brandId: BrandId }) {
  const brand = BRANDS[brandId];
  const { items, incrementItem, decrementItem, removeItem, totalPrice, clear } = useCart();
  const { method } = useFulfillment();
  const { tokens, isDark } = useAppTheme();
  const accent = accentForTheme(brand.colors.primary, isDark);
  const fulfillment = FULFILLMENT_METHODS.find((option) => option.id === method)!;
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [partySize, setPartySize] = useState('2');

  const isDelivery = method === 'delivery';
  const isPickup = method === 'pickup';
  const isEatIn = method === 'eatin';

  const isFormValid = isDelivery
    ? address.trim().length > 0 && phone.trim().length > 0
    : isPickup
      ? name.trim().length > 0 && phone.trim().length > 0
      : name.trim().length > 0 && partySize.trim().length > 0;

  const handleConfirm = () => {
    if (!isFormValid) return;

    const detailLines = isDelivery
      ? [`Address: ${address}`, `Phone: ${phone}`]
      : isPickup
        ? [`Name: ${name}`, `Phone: ${phone}`]
        : [`Name: ${name}`, `Party size: ${partySize}`];

    setCheckoutOpen(false);
    Alert.alert(
      'Order placed',
      `${fulfillment.confirmation}\n\n${detailLines.join('\n')}\n\n(This is a placeholder — payment isn't wired up yet.)`,
    );
    clear();
    setName('');
    setPhone('');
    setAddress('');
    setPartySize('2');
  };

  if (items.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: tokens.background }]}>
        <Ionicons name="cart-outline" size={48} color={tokens.border} />
        <Text style={[styles.emptyText, { color: tokens.textSecondary }]}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      <FlatList
        contentContainerStyle={styles.list}
        data={items}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={[styles.fulfillmentBanner, { backgroundColor: tokens.surface, borderColor: tokens.border }]}>
            <Ionicons name={fulfillment.icon} size={18} color={accent} />
            <Text style={[styles.fulfillmentText, { color: tokens.text }]}>{fulfillment.label}</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const itemBrand = BRANDS[item.brandId];
          const itemAccent = accentForTheme(itemBrand.colors.primary, isDark);
          return (
            <View style={[styles.row, { backgroundColor: tokens.surface }]}>
              <View style={[styles.brandTag, { backgroundColor: itemAccent }]} />
              <Image source={item.image} resizeMode="cover" style={styles.itemThumb} />
              <View style={styles.rowText}>
                <Text style={[styles.itemBrandLabel, { color: itemAccent }]}>{itemBrand.shortName}</Text>
                <Text style={[styles.name, { color: tokens.text }]}>{item.name}</Text>
                <Text style={[styles.price, { color: tokens.textSecondary }]}>{formatPrice(item.price * item.qty)}</Text>
              </View>
              <View style={styles.stepper}>
                <Pressable
                  onPress={() => decrementItem(item.id)}
                  style={[styles.stepperBtn, { borderColor: tokens.border }]}
                  hitSlop={8}>
                  <Ionicons name="remove" size={16} color={tokens.text} />
                </Pressable>
                <Text style={[styles.qty, { color: tokens.text }]}>{item.qty}</Text>
                <Pressable
                  onPress={() => incrementItem(item.id)}
                  style={[styles.stepperBtn, { borderColor: tokens.border }]}
                  hitSlop={8}>
                  <Ionicons name="add" size={16} color={tokens.text} />
                </Pressable>
              </View>
              <Pressable onPress={() => removeItem(item.id)} hitSlop={8} style={styles.removeBtn}>
                <Ionicons name="trash-outline" size={18} color="#c33" />
              </Pressable>
            </View>
          );
        }}
      />
      <View style={[styles.footer, { backgroundColor: tokens.surface, borderTopColor: tokens.border }]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: tokens.textSecondary }]}>Total</Text>
          <Text style={[styles.totalValue, { color: tokens.text }]}>{formatPrice(totalPrice)}</Text>
        </View>
        <Pressable
          style={[styles.checkoutButton, { backgroundColor: brand.colors.primary }]}
          onPress={() => setCheckoutOpen(true)}>
          <Text style={styles.checkoutText}>Place order</Text>
        </Pressable>
      </View>

      <Modal visible={checkoutOpen} transparent animationType="slide" onRequestClose={() => setCheckoutOpen(false)}>
        <KeyboardAvoidingView style={styles.modalRoot} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Pressable style={styles.backdrop} onPress={() => setCheckoutOpen(false)} />
          <View style={[styles.sheet, { backgroundColor: tokens.surface }]}>
            <ScrollView contentContainerStyle={styles.sheetScroll} keyboardShouldPersistTaps="handled">
              <View style={styles.sheetHeader}>
                <Text style={[styles.sheetTitle, { color: tokens.text }]}>How would you like this order?</Text>
                <Pressable onPress={() => setCheckoutOpen(false)} hitSlop={10}>
                  <Ionicons name="close" size={22} color={tokens.textSecondary} />
                </Pressable>
              </View>

              <FulfillmentOptions accentColor={accent} inset={false} />

              <View style={styles.formSection}>
                {isDelivery && (
                  <>
                    <FormField
                      label="Delivery address"
                      value={address}
                      onChangeText={setAddress}
                      placeholder="Street, house no., area"
                      tokens={tokens}
                    />
                    <FormField
                      label="Phone number"
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="07xx xxx xxx"
                      keyboardType="phone-pad"
                      tokens={tokens}
                    />
                  </>
                )}
                {isPickup && (
                  <>
                    <FormField label="Name for pickup" value={name} onChangeText={setName} placeholder="Your name" tokens={tokens} />
                    <FormField
                      label="Phone number"
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="07xx xxx xxx"
                      keyboardType="phone-pad"
                      tokens={tokens}
                    />
                  </>
                )}
                {isEatIn && (
                  <>
                    <FormField label="Name for the table" value={name} onChangeText={setName} placeholder="Your name" tokens={tokens} />
                    <FormField
                      label="Party size"
                      value={partySize}
                      onChangeText={setPartySize}
                      placeholder="2"
                      keyboardType="number-pad"
                      tokens={tokens}
                    />
                  </>
                )}
              </View>
            </ScrollView>

            <View style={[styles.sheetFooter, { borderTopColor: tokens.border }]}>
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: tokens.textSecondary }]}>Total</Text>
                <Text style={[styles.totalValue, { color: tokens.text }]}>{formatPrice(totalPrice)}</Text>
              </View>
              <Pressable
                disabled={!isFormValid}
                style={[
                  styles.checkoutButton,
                  { backgroundColor: brand.colors.primary },
                  !isFormValid && styles.checkoutButtonDisabled,
                ]}
                onPress={handleConfirm}>
                <Text style={styles.checkoutText}>Confirm order · {fulfillment.label}</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { fontSize: 15 },
  list: { padding: 16 },
  separator: { height: 12 },
  fulfillmentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  fulfillmentText: { fontSize: 13, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  brandTag: { width: 4, alignSelf: 'stretch', borderRadius: 2 },
  itemThumb: { width: 44, height: 44, borderRadius: 12 },
  rowText: { flex: 1, gap: 2 },
  itemBrandLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  name: { fontSize: 15, fontWeight: '700' },
  price: { fontSize: 13, marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepperBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { fontSize: 14, fontWeight: '700', minWidth: 14, textAlign: 'center' },
  removeBtn: { paddingLeft: 4 },
  footer: { padding: 16, borderTopWidth: 1, gap: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: 15 },
  totalValue: { fontSize: 18, fontWeight: '800' },
  checkoutButton: { paddingVertical: 14, borderRadius: 999, alignItems: 'center' },
  checkoutButtonDisabled: { opacity: 0.4 },
  checkoutText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  backdrop: { flex: 1 },
  modalRoot: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '88%',
  },
  sheetScroll: { padding: 20, paddingBottom: 8, gap: 4 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  sheetTitle: { fontSize: 17, fontWeight: '800', flex: 1, paddingRight: 12 },
  formSection: { gap: 14, marginTop: 18 },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 },
  fieldInput: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  sheetFooter: {
    borderTopWidth: 1,
    padding: 20,
    gap: 12,
  },
});
