import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

type IconName = 'elektrik' | 'dikkat' | 'uyari' | 'telefon' | 'ok' | 'headset' | 'map-pin' | 'whatsapp';

const ICONS: Record<IconName, any> = {
  elektrik: require('../assets/icons/elektrik.png'),
  dikkat: require('../assets/icons/dikkat.png'),
  uyari: require('../assets/icons/uyari.png'),
  telefon: require('../assets/icons/telefon.png'),
  ok: require('../assets/icons/ok.png'),
  headset: require('../assets/icons/headset.png'),
  'map-pin': require('../assets/icons/map-pin.png'),
  whatsapp: require('../assets/icons/whatsapp.png'),
} as const;

export function PngIcon({
  name,
  size = 30,
  tintColor,
  style,
}: {
  name: IconName;
  size?: number;
  tintColor?: string;
  style?: StyleProp<ImageStyle>;
}) {
  return (
    <Image
      source={ICONS[name]}
      style={[
        { width: size, height: size, resizeMode: 'contain' },
        tintColor ? { tintColor } : null,
        style,
      ]}
    />
      );
}