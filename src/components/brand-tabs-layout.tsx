import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BrandIcon } from '@/components/brand-icon';
import { BrandLogo } from '@/components/brand-logo';
import { HeaderActions } from '@/components/header-actions';
import { BRANDS, type BrandId } from '@/constants/brands';
import { useCart } from '@/context/cart-context';
import { useAppTheme } from '@/context/theme-context';
import { accentForTheme, hexToRgba, mixColor } from '@/utils/color';

const TAB_ICON_SIZE = 24;

function TabIconPill({ focused, color, tintColor, children }: { focused: boolean; color: string; tintColor: string; children: ReactNode }) {
  return (
    <View style={[styles.tabIconWrap, focused && { backgroundColor: hexToRgba(tintColor, 0.16) }]}>
      {children}
    </View>
  );
}

/**
 * Shared Tabs config for a division: Home / Menu / Cart. The header and tab
 * bar are tinted with a wash of the brand's own color (not plain white) and
 * carry a matching accent border, so the logo and icons read as part of the
 * bar's own design rather than a picture dropped on a generic one.
 */
export function BrandTabsLayout({ brandId }: { brandId: BrandId }) {
  const brand = BRANDS[brandId];
  const router = useRouter();
  const { totalCount } = useCart();
  const { isDark, tokens } = useAppTheme();

  const accent = accentForTheme(brand.colors.primary, isDark);
  const barBase = mixColor(brand.colors.primary, tokens.surface, isDark ? 0.08 : 0.05);
  const accentBorder = hexToRgba(accent, isDark ? 0.4 : 0.3);

  const backButton = (onPress: () => void) => () => (
    <Pressable hitSlop={10} style={styles.backButton} onPress={onPress}>
      <Ionicons name="chevron-back" size={26} color={accent} />
    </Pressable>
  );

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: barBase },
          headerShadowVisible: false,
          headerTintColor: accent,
          headerTitle: () => <BrandLogo brandId={brandId} />,
          headerTitleAlign: 'left',
          headerRight: () => <HeaderActions tintColor={accent} />,
          tabBarActiveTintColor: accent,
          tabBarInactiveTintColor: tokens.textSecondary,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: { backgroundColor: barBase, borderTopWidth: 2, borderTopColor: accentBorder },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerLeft: backButton(() => router.dismissTo('/')),
            tabBarIcon: ({ color, focused }) => (
              <TabIconPill focused={focused} color={color} tintColor={accent}>
                <Ionicons name="home-outline" size={TAB_ICON_SIZE} color={color} />
              </TabIconPill>
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: 'Menu',
            headerLeft: backButton(() => router.dismissTo(brand.route)),
            tabBarIcon: ({ color, focused }) => (
              <TabIconPill focused={focused} color={color} tintColor={accent}>
                <BrandIcon brand={brand} size={TAB_ICON_SIZE} color={color} />
              </TabIconPill>
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            headerLeft: backButton(() => router.dismissTo(`${brand.route}/menu` as never)),
            tabBarBadge: totalCount > 0 ? totalCount : undefined,
            tabBarIcon: ({ color, focused }) => (
              <TabIconPill focused={focused} color={color} tintColor={accent}>
                <Ionicons name="cart-outline" size={TAB_ICON_SIZE} color={color} />
              </TabIconPill>
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: { paddingLeft: 8, paddingRight: 4, paddingVertical: 6 },
  tabIconWrap: {
    width: 46,
    height: 34,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: { fontSize: 12, fontWeight: '700' },
});
