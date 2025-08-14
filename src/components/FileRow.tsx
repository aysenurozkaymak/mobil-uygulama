import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = {
  label: string;
  filename?: string;
  onPick: () => void; // RN-yeni proje için gerçek picker’ı sonra bağlarız
};

export default function FileRow({ label, filename, onPick }: Props) {
  return (
    <View style={{ marginTop: spacing.lg }}>
      <Text style={s.label}>{label}</Text>
      <View style={s.row}>
        <Pressable style={s.btn} onPress={onPick}>
          <Text style={s.btnText}>Dosya Seç</Text>
        </Pressable>
        <View style={s.fileBox}>
          <Text style={s.fileText}>{filename || 'Dosya Seçilmedi'}</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  label: { ...typography.p, color: colors.text, marginBottom: 6, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center' },
  btn: {
    backgroundColor: '#183A66',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnText: { color: '#fff', fontWeight: '700' },
  fileBox: {
    flex: 1,
    marginLeft: spacing.md,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D7DCE4',
    borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10,
  },
  fileText: { color: '#667085' },
});