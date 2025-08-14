
// src/screens/HomeScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, typography } from '../theme';
import BottomBar from '../components/BottomBar';

// Modallar
import RatingModal from '../components/RatingModal';
import ThanksModal from '../components/ThanksModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');
const SLIDES = [
  require('../assets/images/slider1.png'),
  require('../assets/images/slider2.webp'),
  require('../assets/images/slider3.jpg'),
];

export default function HomeScreen({ navigation, route }: Props) {
  const [active, setActive] = useState(0);
  const ref = useRef<ScrollView>(null);

  const [showRate, setShowRate] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    if (route?.params && (route.params as any).askRate) {
      setShowRate(true);
      navigation.setParams?.({ askRate: undefined } as any);
    }
  }, [route?.params, navigation]);

  const handleRateSubmit = (stars: number) => {
    setShowRate(false);
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 1200);
  };

  const go =
    (name: keyof RootStackParamList) =>
    () =>
      navigation.navigate(name as any);

  return (
    <View style={s.root}>
      <ScrollView style={s.container} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            <Text style={s.hello}>Merhaba,</Text>
            <Text style={s.user}>AYŞE SILA KOCACIK</Text>
            <Text style={s.meta}>5555555555 - VAN/EDREMİT</Text>
          </View>
          <Image source={require('../assets/images/rota.png')} style={s.logo} />
        </View>

        {/* Search */}
        <TextInput
          placeholder="Yapmak istediğiniz işlemi arayın"
          placeholderTextColor="#9AA4B2"
          style={s.search}
        />

        {/* Slider */}
        <View style={s.sliderWrap}>
          <ScrollView
            ref={ref}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const idx = Math.round(e.nativeEvent.contentOffset.x / width);
              if (idx !== active) setActive(idx);
            }}
            scrollEventThrottle={16}
          >
            {SLIDES.map((src, i) => (
              <Image key={i} source={src} style={s.slide} resizeMode="cover" />
            ))}
          </ScrollView>
          <View style={s.dots}>
            {SLIDES.map((_, i) => (
              <View key={i} style={[s.dot, i === active && s.dotActive]} />
            ))}
          </View>
        </View>

        {/* Grid */}
        <View style={s.grid}> 
          <Tile title="Talep, Şikayet Başvuru" iconSource={require('../assets/icons/plus.png')} tint="#EAF3FF" onPress={go('RequestEmpty')} />
          <Tile title="Kesinti Sorgulama" iconSource={require('../assets/icons/flash.png')} tint="#FFF3EA" onPress={go('OutageInquiry')} />
          <Tile title="Tazminat Sorgulama" iconSource={require('../assets/icons/cash.png')} tint="#EFFFF4" onPress={go('Compensation')} />
          <Tile title="Başvuru Durumları" iconSource={require('../assets/icons/application.png')} tint="#EEF2FF" onPress={go('ApplicationStatus')} />
          <Tile title="İletişim Geçmişi" iconSource={require('../assets/icons/history.png')} tint="#F4EAFF" onPress={go('ContactHistory')} />
          <Tile title="Ödeme İşlemleri" iconSource={require('../assets/icons/payment.png')} tint="#FFF5FA" onPress={go('Payments')} />
        </View>
      </ScrollView>

      {/* Alt bar */}
      <BottomBar active="home" navigation={navigation} />

      {/* Modallar */}
      <RatingModal
        visible={showRate}
        onClose={() => setShowRate(false)}
        onSubmit={handleRateSubmit}
      />
      <ThanksModal visible={showThanks} />
    </View>
  );
}

function Tile({
  title,
  iconSource,
  tint = '#EEF2FF',
  onPress,
}: {
  title: string;
  iconSource: any;
  tint?: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={s.card} android_ripple={{ color: '#e9eef9' }} onPress={onPress}>
      <View style={[s.iconWrap, { backgroundColor: tint }]}>
        <Image
          source={iconSource}
          style={{ width: 28, height: 28, resizeMode: 'contain' }}
        />
      </View>
      <Text style={s.cardTitle}>{title}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  hello: { ...typography.p, color: '#183A66', fontWeight: '700' },
  user: { ...typography.p, color: '#0B1324', fontWeight: '800', marginTop: 2 },
  meta: { ...typography.p, color: '#6B7280', marginTop: 4 },
  logo: { width: 80, height: 110, resizeMode: 'contain', marginLeft: spacing.md },

  search: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    height: 40,
    borderWidth: 1,
    borderColor: '#D7DCE4',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
  },

  sliderWrap: { marginHorizontal: spacing.lg, borderRadius: 8, overflow: 'hidden' },
  slide: { width: width - spacing.lg * 2, height: 120, borderRadius: 8 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 8, gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D1D5DB' },
  dotActive: { backgroundColor: '#183A66' },

  grid: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
  },
  card: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    height: 112,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    ...Platform.select({
      ios:  { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
      android: { elevation: 3 },
    }),
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.p,
    color: '#0B1324',
    fontWeight: '700',
    lineHeight: 18,
  },
});

