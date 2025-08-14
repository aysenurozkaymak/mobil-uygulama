// src/screens/InstallationDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'InstallationDetail'>;

export default function InstallationDetailScreen({ route }: Props) {
  // route.params yoksa patlamasın
  const d = (route.params ?? {}) as Partial<RootStackParamList['InstallationDetail']>;

  return (
    <View style={s.container}>
      <View style={s.card}>
        <Row
          label="Sözleşme Durumu"
          value={
            <View style={[s.badge, d.contractStatus === 'AKTİF' ? s.badgeOk : s.badgePassive]}>
              <Text style={s.badgeText}>{d.contractStatus ?? '-'}</Text>
            </View>
          }
        />
        <Row label="Sözleşme No" value={d.contractNo ?? '-'} />
        <Row label="Tesisat No" value={d.installationNo ?? '-'} />
        <Row label="Ad" value={d.name ?? '-'} />
        <Row label="Soyad" value={d.surname ?? '-'} />
        <Row label="Sözleşme Başlama Tarihi" value={d.startDate ?? '-'} />
        <Row label="Sözleşme Bitiş Tarihi" value={d.endDate ?? '-'} />
        <Row label="İl" value={d.city ?? '-'} />
        <Row label="İlçe" value={d.district ?? '-'} />
        <Row label="Bucak/Köy" value={d.village ?? '-'} />
        <Row label="Mahalle" value={d.neighborhood ?? '-'} />
        <Row label="Cadde/Sokak" value={d.street ?? '-'} />
        <Row label="Bina No" value={d.buildingNo ?? '-'} />
        <Row label="İç Kapı/Daire No" value={d.doorNo ?? '-'} />
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <View style={s.row}>
      <Text style={s.label}>{label}:</Text>
      {typeof value === 'string' ? <Text style={s.value}>{value}</Text> : value}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: spacing.lg },
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: spacing.md,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: { width: 180, color: '#183A66', fontWeight: '700' },
  value: { flex: 1, color: '#0B1324' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeOk: { backgroundColor: '#22C55E' },
  badgePassive: { backgroundColor: '#9CA3AF' },
  badgeText: { color: '#fff', fontWeight: '700' },
});