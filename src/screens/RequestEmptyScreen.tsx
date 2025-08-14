import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestEmpty'>;

export default function RequestEmptyScreen({ navigation }: Props) {
  return (
    <View style={s.container}>
      <Pressable style={s.primary} onPress={() => navigation.navigate('RequestEntry')}>
        <Text style={s.primaryText}>Yeni Başvuru Oluştur</Text>
      </Pressable>

      <View style={s.empty}>
        <Text style={s.emptyIcon}>⚠</Text>
        <Text style={s.emptyText}>Başvuru Bulunmamaktadır</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  primary: { alignSelf: 'center', backgroundColor: '#0B2A55', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 },
  primaryText: { color: '#fff', fontWeight: '700' },
  empty: { marginTop: 40, alignItems: 'center', gap: 8 },
  emptyIcon: { fontSize: 44 },
  emptyText: { color: '#6B7280', fontWeight: '700' },
});