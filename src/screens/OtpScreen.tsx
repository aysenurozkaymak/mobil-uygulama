// src/screens/OtpScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export default function OtpScreen({ route, navigation }: Props) {
  // login mi talep/başvuru akışı mı?
  const { context = 'login' } = route.params ?? ({} as any);
  const ctx = route.params?.context || 'login';
  const [code, setCode] = useState(['', '', '', '']);
  const [sec, setSec] = useState(178); // 2:58
  const inputs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  useEffect(() => {
    const t = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');

  const expected = context === 'request' ? '6666' : '1229';

  const verify = () => {
    const entered = code.join('');
    if (entered.length < 4) return;
    if (entered !== expected) {
      Alert.alert('Hatalı Kod', 'Lütfen doğrulama kodunu kontrol edin.');
      return;
    }

    if (context === 'request') {
      Alert.alert('İşlem Başarılı', 'Başvurunuz alınmıştır.', [
        {
          text: 'Tamam',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }),
        },
      ]);
    } else {
      // login sonu
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };

  const setDigit = (i: number, v: string) => {
    const d = v.slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < 3) inputs[i + 1].current?.focus();
  };

  const resend = () => setSec(178);

  return (
    <View style={s.wrap}>
      <View style={{ alignItems: 'center', marginTop: 12, marginBottom: 8 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#183A66' }}>ROTA CRM</Text>
      </View>

      <Text style={s.timer}>
        Kalan Süre <Text style={{ color: '#E11D48' }}>{mm}:{ss}</Text>
      </Text>

      <Text style={s.info}>
        Doğrulama Kodu ******{expected} telefon numarasına gönderdik.
      </Text>

      <View style={s.codeRow}>
        {code.map((c, i) => (
          <TextInput
            key={i}
            ref={inputs[i]}
            value={c}
            onChangeText={t => setDigit(i, t)}
            keyboardType="number-pad"
            maxLength={1}
            style={s.box}
            returnKeyType="next"
          />
        ))}
      </View>

      <TouchableOpacity style={s.btn} onPress={verify}>
        <Text style={s.btnTxt}>Onayla</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={sec > 0} onPress={resend}>
        <Text style={[s.resend, sec > 0 && { opacity: 0.5 }]}>Kodu Tekrar Gönder</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#F6F7FB', padding: 24, justifyContent: 'center' },
  timer: { textAlign: 'center', marginTop: 12, color: '#6B7280' },
  info: { textAlign: 'center', marginTop: 10, color: '#4B5563' },
  codeRow: { flexDirection: 'row', justifyContent: 'center', gap: 14, marginTop: 14 },
  box: {
    width: 56, height: 56, borderRadius: 10, borderWidth: 1, borderColor: '#D0D5DD',
    backgroundColor: '#fff', textAlign: 'center', fontSize: 22,
  },
  btn: { backgroundColor: '#183A66', height: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  btnTxt: { color: '#fff', fontWeight: '700' },
  resend: { textAlign: 'center', marginTop: 10, color: '#183A66', fontWeight: '600' },
});