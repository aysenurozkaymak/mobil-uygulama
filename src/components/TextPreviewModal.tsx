import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

type Props = {
  visible: boolean;
  text: string;
  title?: string;
  onClose: () => void;
};

export default function TextPreviewModal({ visible, text, title = 'Metni Gör', onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={s.backdrop}>
        <View style={s.sheet}>
          <View style={s.header}>
            <Text style={s.headerTitle}>{title}</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={s.close}>Kapat</Text>
            </Pressable>
          </View>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }}>
            <Text style={s.body}>{text}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    maxHeight: '70%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#0B1324' },
  close: { fontSize: 14, fontWeight: '700', color: '#183A66' },
  body: { fontSize: 14, lineHeight: 20, color: '#0B1324', marginTop: 12 },
});