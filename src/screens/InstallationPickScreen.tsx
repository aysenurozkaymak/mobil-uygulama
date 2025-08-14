import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'InstallationPick'>;

const MOCK_INSTALLATIONS = [
  {
    no: '8451531',
    address: 'Yeni Cami Mahallesi, Gürsel Sok. No:44/5 65100 Edremit (Gümüşdere)/Van',
  },
  {
    no: '8451535',
    address: 'Yeni Cami Mahallesi, Gürsel Sok. No:41 65100 Edremit (Gümüşdere)/Van',
  },
];

export default function InstallationPickScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<{ no: string; address: string } | null>(null);

  const onContinue = () => {
    if (!selected) return;

    navigation.navigate('RequestForm', {
      installationNo: selected.no,
      prefill: {
        ownership: 'MÜLK SAHİBİ (Şahıs)',
        tc: '11111111111',
        name: 'Ayşe Sıla',
        surname: 'KOCACIK',
        email: 'ayse@gmail.com',
        phone: '5555555555',
        address: {
          il: 'VAN',
          ilce: 'EDREMİT',
          mahalle: 'YENİ CAMİ',
          cadde: 'GÜRSEL',
          binaNo: '44',
          daireNo: '5',
        },
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ margin: 16, fontWeight: '700' }}>Tesisat Numarası seçiniz</Text>

      <FlatList
        data={MOCK_INSTALLATIONS}
        keyExtractor={(i) => i.no}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={[styles.row, selected?.no === item.no && styles.rowActive]}
          >
            <Text style={styles.no}>{item.no}</Text>
            <Text style={styles.addr}>{item.address}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 16 }}
      />

      <TouchableOpacity style={styles.cta} onPress={onContinue}>
        <Text style={styles.ctaTxt}>Devam</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { padding: 12, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10 },
  rowActive: { borderColor: '#183A66' },
  no: { fontWeight: '800', marginBottom: 6, color: '#0B1324' },
  addr: { color: '#6B7280' },
  cta: {
    margin: 16,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#183A66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTxt: { color: '#fff', fontWeight: '700' },
});