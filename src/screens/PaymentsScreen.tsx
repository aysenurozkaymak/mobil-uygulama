// src/screens/PaymentsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Payments'>;

export default function PaymentsScreen({}: Props) {
  //  mode: 'installation' = Tesisat No ile, 'muta' = Muta No ile
  const [mode, setMode] = useState<'installation' | 'muta'>('installation');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<null | {
    totalDebt: number; // TL
    hasEnforcementDebt: boolean; // icralık
    hasDebt: boolean;
  }>(null);

  const onSearch = () => {
    // demo: 8547896 girilirse görseldeki son ekranı üret
    if (query.trim() === '8547896') {
      setResult({ totalDebt: 0, hasEnforcementDebt: false, hasDebt: false });
    } else {
      // başka her şey için uyarı kartları yine "borç yok" gibi davransın
      setResult({ totalDebt: 0, hasEnforcementDebt: false, hasDebt: false });
    }
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={s.header}>Ödeme İşlemleri</Text>

      {/* Radio group */}
      <View style={s.radioGroup}>
        <Radio
          label="Tesisat No ile Sorgula"
          checked={mode === 'installation'}
          onPress={() => setMode('installation')}
        />
        <Radio
          label="Muta No ile Sorgula"
          checked={mode === 'muta'}
          onPress={() => setMode('muta')}
        />
      </View>

      {/* Input */}
      <Text style={s.label}>{mode === 'installation' ? 'Tesisat No' : 'Muta No'}</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={mode === 'installation' ? 'Tesisat No Giriniz' : 'Muta No Giriniz'}
        keyboardType="number-pad"
        style={s.input}
      />

      {/* CTA */}
      <Pressable onPress={onSearch} style={({ pressed }) => [s.btn, pressed && { opacity: 0.9 }]}>
        <Text style={s.btnTxt}>Sorgula</Text>
      </Pressable>

      {/* Result blocks */}
      <Section title="Güncel Toplam Borç">
        {result ? (
          result.totalDebt > 0 ? (
            <Alert type="error" text={`Toplam Güncel Borç Tutarı: ${result.totalDebt.toFixed(2)} TL`} />
          ) : (
            <Alert type="successSubtle" text="Toplam Güncel Borç Tutarı: 0.00 TL" />
          )
        ) : (
          <Muted text="Tesisat Seçiniz" />
        )}
      </Section>

      <Section title="Ödemesi Oluşmamış İcralık Borçlar">
        {result ? (
          result.hasEnforcementDebt ? (
            <Alert type="error" text="İcralık borcunuz bulunmaktadır." />
          ) : (
            <Alert type="success" text="İcralık Borcunuz Bulunmamaktadır." />
          )
        ) : (
          <Muted text="Tesisat Seçiniz" />
        )}
      </Section>

      <Section title="Borçlar">
        {result ? (
          result.hasDebt ? (
            <Alert type="error" text="Borcunuz bulunmaktadır." />
          ) : (
            <Alert type="success" text="Borcunuz Bulunmamaktadır." />
          )
        ) : (
          <Muted text="Tesisat Seçiniz" />
        )}
      </Section>
    </ScrollView>
  );
}

/* ---------------- UI atoms ---------------- */

function Radio({ label, checked, onPress }: { label: string; checked: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={s.radioRow}>
      <View style={[s.radioOuter, checked && s.radioOuterActive]}>
        {checked ? <View style={s.radioInner} /> : null}
      </View>
      <Text style={s.radioLabel}>{label}</Text>
    </Pressable>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={{ marginTop: 8 }}>{children}</View>
    </View>
  );
}

function Muted({ text }: { text: string }) {
  return (
    <View style={s.muted}>
      <Text style={s.mutedTxt}>ⓘ {text}</Text>
    </View>
  );
}

function Alert({ type, text }: { type: 'success' | 'successSubtle' | 'error'; text: string }) {
  const styleMap = {
    success: { bg: '#D1FADF', border: '#A6F4C5', text: '#065F46' },
    successSubtle: { bg: '#F0FDF4', border: '#DCFCE7', text: '#166534' },
    error: { bg: '#FEE2E2', border: '#FCA5A5', text: '#991B1B' },
  }[type];

  return (
    <View style={[s.alert, { backgroundColor: styleMap.bg, borderColor: styleMap.border }]}>
      <Text style={[s.alertTxt, { color: styleMap.text }]}>{text}</Text>
    </View>
  );
}

/* ---------------- styles ---------------- */

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    backgroundColor: '#183A66',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    fontWeight: '800',
    marginBottom: 14,
    fontSize: 16,
  },

  radioGroup: { gap: 10, marginBottom: 10 },
  radioRow: { flexDirection: 'row', alignItems: 'center' },
  radioOuter: {
    width: 20, height: 20, borderRadius: 12, borderWidth: 2, borderColor: '#CBD5E1',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  radioOuterActive: { borderColor: '#183A66' },
  radioInner: { width: 10, height: 10, borderRadius: 6, backgroundColor: '#183A66' },
  radioLabel: { color: '#0B1324' },

  label: { marginTop: 8, marginBottom: 6, color: '#334155', fontWeight: '600' },
  input: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 12, height: 42,
    backgroundColor: '#F8FAFC',
  },

  btn: {
    marginTop: 14, height: 44, borderRadius: 10, backgroundColor: '#183A66',
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', paddingHorizontal: 28,
  },
  btnTxt: { color: '#fff', fontWeight: '700' },

  sectionTitle: { color: '#0B1324', fontWeight: '700' },

  muted: {
    backgroundColor: '#F2F4F7',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  mutedTxt: { color: '#667085' },

  alert: { padding: 12, borderRadius: 10, borderWidth: 1 },
  alertTxt: { fontWeight: '600' },
});
