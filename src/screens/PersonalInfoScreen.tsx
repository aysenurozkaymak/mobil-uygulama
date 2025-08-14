// src/screens/PersonalInfoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing } from '../theme';

export default function PersonalInfoScreen() {
  const info = {
    tc: '11111111111',
    name: 'Ayşe Sıla',
    surname: 'KOCACIK',
    email: 'sila@........',
    phone: '5555555555',
  };

  return (
    <View style={s.container}>
      <Field label="T.C. Kimlik No" value={info.tc} />
      <Field label="Ad" value={info.name} />
      <Field label="Soyad" value={info.surname} />
      <Field label="E-Posta" value={info.email} />
      <Field label="Telefon No" value={info.phone} />
    </View>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.row}>
      <Text style={s.label}>{label}:</Text>
      <Text style={s.value}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: spacing.lg },
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
    flexDirection: 'row',
  },
  label: { width: 140, color: '#183A66', fontWeight: '700' },
  value: { flex: 1, color: '#0B1324' },
});