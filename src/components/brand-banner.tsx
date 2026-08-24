import { LinearGradient } from 'expo-linear-gradient';
import { useState, type ReactNode } from 'react';
import {
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type ImageStyle,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import type { Brand } from '@/constants/brands';

/**
 * Full-bleed banner for a brand: a photo with a bottom-to-top dark gradient
 * (keeps overlaid text readable over any photo) when `photo` is given,
 * otherwise falls back to the brand's own gradient colors.
 *
 * The photo is sized off a measured pixel width/height from `onLayout`
 * rather than percentages or `ImageBackground`: percentage sizing on an
 * absolutely-positioned Image is resolved inconsistently across web/iOS/
 * Android (some fall back to the source's own intrinsic pixel size), so
 * exact measured pixels are the only sizing that's reliable everywhere.
 */
export function BrandBanner({
  brand,
  photo,
  style,
  imageStyle,
  children,
}: {
  brand: Brand;
  photo?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  children: ReactNode;
}) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  if (photo) {
    return (
      <View style={style} onLayout={onLayout}>
        {size && (
          <Image
            source={photo}
            resizeMode="cover"
            style={[StyleSheet.absoluteFill, { width: size.width, height: size.height }, imageStyle]}
          />
        )}
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFill} />
        {children}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={brand.colors.gradient}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={style}>
      {children}
    </LinearGradient>
  );
}
