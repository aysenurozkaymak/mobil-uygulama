import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'InstallationList'>;

const DATA = [
  {
    installationNo: '8451531',
    startDate: '30.01.2025',
    city: 'VAN',
    district: 'EDREMİT',
  },
  {
    installationNo: '8451535',
    startDate: '30.01.2025',
    city: 'VAN',
    district: 'EDREMİT',
  },
];

export default function InstallationListScreen({ navigation }: Props) {
  const goDetail = (it: typeof DATA[number]) => {
    navigation.navigate('InstallationDetail', {
      contractStatus: 'AKTİF',
      contractNo: '865485',
      installationNo: it.installationNo,
      name: 'Ayşe Sıla',
      surname: 'KOCACIK',
      startDate: it.startDate,
      city: it.city,
      district: it.district,
      neighborhood: 'Yeni Cami',
      street: 'Gürsel Sok.',
      buildingNo: it.installationNo === '8451531' ? '41' : '—',
      doorNo: '5',
    });
  };

  return (
    <View style={s.container}>
      {DATA.map((it, idx) => (
        <Pressable key={idx} onPress={() => goDetail(it)} style={s.card}>
          <Text style={s.title}>Tesisat No: <Text style={s.value}>{it.installationNo}</Text></Text>
          <Text style={s.row}>
            <Text style={s.label}>Sözleşme Başlangıç Tarihi:</Text> {it.startDate}
          </Text>
          <Text style={s.row}><Text style={s.label}>İl:</Text> {it.city}</Text>
          <Text style={s.row}><Text style={s.label}>İlçe:</Text> {it.district}</Text>
          <Text style={s.chev}>›</Text>
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: spacing.lg, gap: spacing.md },
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: spacing.md,
    position: 'relative',
  },
  title: { color: '#183A66', fontWeight: '700', marginBottom: 6 },
  row: { color: '#0B1324', marginTop: 2 },
  label: { color: '#183A66', fontWeight: '700' },
  value: { color: '#0B1324', fontWeight: '700' },
  chev: { position: 'absolute', right: 12, top: '50%', marginTop: -14, fontSize: 24, color: '#94A3B8' },
});