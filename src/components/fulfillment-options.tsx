import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FULFILLMENT_METHODS } from '@/constants/fulfillment';
import { useFulfillment } from '@/context/fulfillment-context';
import { useAppTheme } from '@/context/theme-context';

/**
 * The real, functional Delivery/Pickup/Eat-in picker — writes to the shared
 * fulfillment context. Only used inside the checkout sheet now; Home shows
 * an `OrderPromoBanner` instead, so the only place a choice actually takes
 * effect is at checkout.
 *
 * `inset` adds the component's own horizontal/top padding — turn it off when
 * the parent already provides its own padding (e.g. inside a modal sheet).
 */
export function FulfillmentOptions({ accentColor, inset = true }: { accentColor: string; inset?: boolean }) {
  const { method, setMethod } = useFulfillment();
  const { tokens } = useAppTheme();
  const active = FULFILLMENT_METHODS.find((option) => option.id === method)!;

  return (
    <View>
      <View style={[styles.row, inset && styles.rowInset]}>
        {FULFILLMENT_METHODS.map((option) => {
          const isActive = option.id === method;
          return (
            <Pressable
              key={option.id}
              onPress={() => setMethod(option.id)}
              style={[
                styles.option,
                { borderColor: tokens.border },
                isActive && { backgroundColor: accentColor, borderColor: accentColor },
              ]}>
              <Ionicons name={option.icon} size={18} color={isActive ? '#fff' : tokens.textSecondary} />
              <Text style={[styles.label, { color: tokens.text }, isActive && styles.labelActive]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.info, { color: accentColor }, inset && styles.infoInset]}>{active.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
  rowInset: { paddingHorizontal: 20, paddingTop: 16 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  label: { fontSize: 13, fontWeight: '600' },
  labelActive: { color: '#fff' },
  info: { fontSize: 12, fontWeight: '600', paddingTop: 10 },
  infoInset: { paddingHorizontal: 20 },
});
