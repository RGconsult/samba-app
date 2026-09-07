import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/context/theme-context';

export function HeaderActions({ tintColor = '#1a1a1a' }: { tintColor?: string }) {
  const { isDark, toggleTheme } = useAppTheme();
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <View style={styles.row}>
      <Pressable
        hitSlop={10}
        style={styles.iconButton}
        onPress={() => {
          setHasNotification(false);
          Alert.alert('Notifications', "You're all caught up — no new notifications.");
        }}>
        <Ionicons name="notifications-outline" size={23} color={tintColor} />
        {hasNotification && <View style={styles.dot} />}
      </Pressable>
      <Pressable hitSlop={10} style={styles.iconButton} onPress={toggleTheme}>
        <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={23} color={tintColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingRight: 8 },
  iconButton: { padding: 7 },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E23A36',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
});
