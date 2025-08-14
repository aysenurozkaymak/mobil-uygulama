// src/screens/RequestEntryScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestEntry'>;

const Row = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <Pressable style={s.row} android_ripple={{ color: '#e5e7eb' }} onPress={onPress}>
    <Text style={s.rowText}>{title}</Text>
    <Text style={s.chev}>›</Text>
  </Pressable>
);

export default function RequestEntryScreen({ navigation }: Props) {
  return (
    <View style={s.container}>
      <Row
        title="Kendi tesisatım için talep ihbar şikayet oluştur"
        onPress={() =>
          navigation.navigate('InstallationPick', {
            // InstallationPick içinde bu verilerle formu doldurabilirsin
            prefill: {
              tc: '11111111111',
              name: 'Ayşe Sıla',
              surname: 'KOCACIK',
              phone: '5555555555',
              email: 'sila@example.com',
              address: {
                city: 'VAN',
                district: 'EDREMİT',
                neighborhood: 'Yeni Cami',
                street: 'Gürsel Sok.',
                buildingNo: '41',
                doorNo: '5',
              },
              installationNo: '8451531',
              contractNo: '865485',
            },
          })
        }
      />

      <Row
        title="Farklı bir adres için talep ihbar şikayet oluştur"
        // Boş form akışı
        onPress={() => navigation.navigate('FaultReport')}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 8 },
  row: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: { color: '#0B1324', fontWeight: '600' },
  chev: { color: '#9CA3AF', fontSize: 20, marginLeft: 8 },
});