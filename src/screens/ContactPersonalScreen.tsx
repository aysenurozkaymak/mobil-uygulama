
// src/screens/ContactPersonalScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview'; // ← eklendi
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, typography } from '../theme';
import BottomBar from '../components/BottomBar';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactPersonal'>;

const MAP_HTML = `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<style>
  html,body,#wrap{height:100%;margin:0;background:#fff}
  .frame{width:100%;height:100%;border:0;border-radius:12px}
</style></head><body>
<div id="wrap">
<iframe
  class="frame"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  allowfullscreen
  src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1144.807629367258!2d43.35666275752179!3d38.47288665260059!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzjCsDI4JzIzLjEiTiA0M8KwMjEnMjYuMiJF!5e1!3m2!1str!2sus!4v1754985567298!5m2!1str!2sus">
</iframe>
</div>
</body></html>`;

export default function ContactPersonalScreen({ navigation }: Props) {
  const callCenter = () => Linking.openURL('tel:08502110186');
  const openWhatsApp = () => Linking.openURL('https://wa.me/905386552828');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            <Text style={s.hello}>Merhaba,</Text>
            <Text style={s.user}>AYŞE SILA KOCACIK</Text>
          </View>
          <Image source={require('../assets/images/rota.png')} style={s.logo} />
        </View>

        {/* Action buttons */}
        <ActionCard
          bg="#183A66"
          icon={require('../assets/icons/headset.png')}
          title="Vedaş Çözüm Merkezi"
          subtitle="0 (850) 211 0 186"
          onPress={callCenter}
        />
        <ActionCard
          bg="#183A66"
          icon={require('../assets/icons/pin.png')}
          title="Tüketici Hizmet Noktaları"
          onPress={() => navigation.navigate('ServicePoints')}
        />
        <ActionCard
          bg="#183A66"
          icon={require('../assets/icons/whatsapp.png')}
          title="Whatsapp Hattı"
          subtitle="0 (538) 655 28 28"
          onPress={openWhatsApp}
        />

        {/* Info card */}
        <View style={s.infoCard}>
          <Text style={s.infoTitle}>İletişim Bilgileri</Text>
          <Text style={s.infoLine}>
            Süphan Mahallesi Sümerbank Caddesi Vedaş Sitesi{'\n'}B Blok No:9 Edremit / Van
          </Text>
          <Text style={s.infoLine}>Fax: 0 (850) 211 65 14</Text>
          <Text style={s.infoLine}>
            <Text style={{ fontWeight: '700' }}>E-Posta: </Text>info@vedas.com.tr
          </Text>
          <Text style={s.infoLine}>
            <Text style={{ fontWeight: '700' }}>KEP: </Text>vangoluelektrikdagitim@hs03.kep.tr
          </Text>

          {/* Harita (iframe içeren WebView) */}
          <View style={{ marginTop: 12, height: 220, borderRadius: 12, overflow: 'hidden' }}>
            <WebView
              originWhitelist={['*']}
              source={{ html: MAP_HTML }}
              javaScriptEnabled
              domStorageEnabled
              setSupportMultipleWindows={false}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
        </View>
      </ScrollView>

      <BottomBar active="contact" navigation={navigation} />
    </View>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  onPress,
  bg,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  onPress: () => void;
  bg: string;
}) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[s.card, { backgroundColor: bg }]}>
      <View style={s.cardLeft}>
        <View style={s.iconWrap}>
          <Image source={icon} style={{ width: 22, height: 22, tintColor: '#fff' }} />
        </View>
        <View>
          <Text style={s.cardTitle}>{title}</Text>
          {subtitle ? <Text style={s.cardSub}>{subtitle}</Text> : null}
        </View>
      </View>
      <Image source={require('../assets/icons/chevron-right.png')} style={s.chev} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  hello: { ...typography.p, color: '#183A66', fontWeight: '700' },
  user: { color: '#0B1324', fontWeight: '800', marginTop: 2 },
  logo: { width: 80, height: 110, resizeMode: 'contain', marginLeft: spacing.md },

  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: 12,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconWrap: {
    width: 36, height: 36, borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  cardTitle: { color: '#fff', fontWeight: '700' },
  cardSub: { color: '#C7D2FE', fontSize: 12, marginTop: 2 },
  chev: { width: 16, height: 16, tintColor: '#C7D2FE' },

  infoCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    padding: spacing.md,
    gap: 4,
  },
  infoTitle: { ...typography.p, fontWeight: '800', color: '#0B1324', marginBottom: 6 },
  infoLine: { color: '#334155' },
  map: { width: '100%', height: 140, borderRadius: 8, marginTop: spacing.sm }, // (stil kalsın)
});