import { KaushanScript_400Regular, useFonts } from '@expo-google-fonts/kaushan-script';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { BrandLogo } from '@/components/brand-logo';
import { HeaderActions } from '@/components/header-actions';
import { CartProvider } from '@/context/cart-context';
import { FulfillmentProvider } from '@/context/fulfillment-context';
import { AppThemeProvider, useAppTheme } from '@/context/theme-context';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isDark, tokens } = useAppTheme();
  const headerTint = isDark ? '#ffffff' : '#1a1a1a';

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: tokens.surface },
          headerTintColor: headerTint,
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <BrandLogo />,
            headerTitleAlign: 'left',
            headerLeft: () => null,
            headerRight: () => <HeaderActions tintColor={headerTint} />,
          }}
        />
        <Stack.Screen name="supermarket" options={{ headerShown: false }} />
        <Stack.Screen name="pizza" options={{ headerShown: false }} />
        <Stack.Screen name="chicken" options={{ headerShown: false }} />
        <Stack.Screen name="burger" options={{ headerShown: false }} />
        <Stack.Screen name="snacks" options={{ headerShown: false }} />
        <Stack.Screen name="salad" options={{ headerShown: false }} />
        <Stack.Screen name="coffee" options={{ headerShown: false }} />
        <Stack.Screen name="drinks" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ KaushanScript_400Regular });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppThemeProvider>
      <CartProvider>
        <FulfillmentProvider>
          <RootNavigator />
        </FulfillmentProvider>
      </CartProvider>
    </AppThemeProvider>
  );
}
