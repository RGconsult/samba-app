import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const OPTIONS = [
  { id: 'delivery', label: 'Delivery', icon: 'bicycle-outline' as const },
  { id: 'pickup', label: 'Pickup', icon: 'bag-handle-outline' as const },
  { id: 'eatin', label: 'Eat in', icon: 'restaurant-outline' as const },
];

export function FulfillmentOptions({ accentColor }: { accentColor: string }) {
  const [selected, setSelected] = useState('delivery');

  return (
    <View style={styles.row}>
      {OPTIONS.map((option) => {
        const active = option.id === selected;
        return (
          <Pressable
            key={option.id}
            onPress={() => setSelected(option.id)}
            style={[styles.option, active && { backgroundColor: accentColor, borderColor: accentColor }]}>
            <Ionicons name={option.icon} size={18} color={active ? '#fff' : '#444'} />
            <Text style={[styles.label, active && styles.labelActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingTop: 16 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#e2e2e2',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  label: { fontSize: 13, fontWeight: '600', color: '#444' },
  labelActive: { color: '#fff' },
});
