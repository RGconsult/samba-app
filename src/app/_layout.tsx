import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { BrandLogo } from '@/components/brand-logo';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#111111' },
          headerTintColor: '#ffffff',
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <BrandLogo />,
            headerTitleAlign: 'left',
          }}
        />
        <Stack.Screen name="supermarket" options={{ headerShown: false }} />
        <Stack.Screen name="pizza" options={{ headerShown: false }} />
        <Stack.Screen name="chicken" options={{ headerShown: false }} />
        <Stack.Screen name="coffee" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
