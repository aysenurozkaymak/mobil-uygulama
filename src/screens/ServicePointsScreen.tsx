
// src/screens/ServicePointsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { WebView } from 'react-native-webview';
import { colors, spacing, typography } from '../theme';

type Point = {
  title: string;
  address: string;
  phone?: string;
  fax?: string;
  email?: string;
  embedHtml: string; // doğrudan <iframe> HTML
};

const IFRAME_WRAP = (inner: string) => `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
<style>
  html,body,#wrap{height:100%;margin:0;background:#fff}
  iframe{width:100%;height:100%;border:0;border-radius:12px}
</style></head><body><div id="wrap">${inner}</div></body></html>`;

// Verdiğin 1. ve 2. iframeler:
const EDREMIT_MAIN_IFRAME = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.6998988470245!2d43.357261699999995!3d38.473040899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x401271eaf55471a1%3A0xe7cff7351816c58f!2zVmFuZ8O2bMO8IEVsZWt0cmlrIERhxJ_EsXTEsW0gQS7Fng!5e1!3m2!1str!2sus!4v1754987448218!5m2!1str!2sus" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

const EDREMIT_SERVICE_IFRAME = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50043.19838155241!2d43.357261699999995!3d38.473040899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4012717e2131cdb5%3A0x92a267878b4b1f35!2zVkVEQcWeIFZhbiDEsGwgTcO8ZMO8cmzDvMSfw7wgxLBwZWt5b2x1IE3DvHN0ZXJpIEhpem1ldGxlcmkgTWVya2V6aQ!5e1!3m2!1str!2sus!4v1754987628316!5m2!1str!2sus" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

const POINTS: Record<string, Point[]> = {
  'VAN|EDREMİT': [
    {
      title: 'Şirket Müdürlüğü',
      address:
        'Vangölü Elektrik Dağıtım A.Ş, Vedaş Sitesi, Sümerbank Cd. No:9 B Blok, 65000 Edremit / Van',
      phone: '0 (850) 314 94 00',
      fax: '0 (850) 211 65 06',
      email: 'info@vedas.com.tr',
      embedHtml: IFRAME_WRAP(EDREMIT_MAIN_IFRAME),
    },
    {
      title: 'Van / Edremit',
      address: 'YENİ CAMİ Mah. SAHİL Cad. No: 299 / 1 EDREMİT / VAN',
      phone: '0 (850) 314 94 00',
      embedHtml: IFRAME_WRAP(EDREMIT_SERVICE_IFRAME),
    },
  ],
};

export default function ServicePointsScreen() {
  const [il, setIl] = useState('VAN');
  const [ilce, setIlce] = useState('EDREMİT');
  const [submitted, setSubmitted] = useState(false);

  const key = `${il}|${ilce}`;
  const results = POINTS[key] ?? [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
      {/* Form */}
      <Text style={styles.label}>İl</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={il} onValueChange={setIl}>
          <Picker.Item label="VAN" value="VAN" />
        </Picker>
      </View>

      <Text style={styles.label}>İlçe</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={ilce} onValueChange={setIlce}>
          <Picker.Item label="EDREMİT" value="EDREMİT" />
        </Picker>
      </View>

      <Pressable style={styles.queryBtn} onPress={() => setSubmitted(true)}>
        <Text style={styles.queryText}>Sorgula</Text>
      </Pressable>

      {/* Sonuçlar + Haritalar */}
      {submitted &&
        results.map((p, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.cardTitle}>{p.title}</Text>
            <Text style={styles.cardLine}>{p.address}</Text>
            {p.phone ? <Text style={styles.cardLine}>Telefon: {p.phone}</Text> : null}
            {p.fax ? <Text style={styles.cardLine}>Fax: {p.fax}</Text> : null}
            {p.email ? <Text style={styles.cardLine}>Mail: {p.email}</Text> : null}

            <View style={{ height: 200, marginTop: spacing.md, borderRadius: 12, overflow: 'hidden' }}>
              <WebView
                originWhitelist={['*']}
                source={{ html: p.embedHtml }}
                javaScriptEnabled
                domStorageEnabled
                setSupportMultipleWindows={false}
                style={{ backgroundColor: 'transparent' }}
              />
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  label: { ...typography.p, color: colors.text, marginTop: spacing.md, marginBottom: 6, fontWeight: '600' },
  pickerBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    overflow: 'hidden',
  },
  queryBtn: {
    alignSelf: 'center',
    backgroundColor: '#183A66',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginVertical: spacing.lg,
  },
  queryText: { color: '#fff', fontWeight: '700' },

  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: { ...typography.p, fontWeight: '800', color: colors.text, marginBottom: 4 },
  cardLine: { color: colors.text, marginTop: 4 },
});