import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export default function SuccessModal({
  visible,
  onClose,
  title = 'İşlem Başarılı',
  message = 'Başvurunuz Alınmıştır.',
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={s.backdrop}>
        <View style={s.card}>
          <Text style={s.icon}>✓</Text>
          <Text style={s.title}>{title}</Text>
          <Text style={s.msg}>{message}</Text>

          <Pressable style={s.btn} android_ripple={{ color: 'rgba(0,0,0,0.08)' }} onPress={onClose}>
            <Text style={s.btnText}>Kapat</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  card: {
    width: '78%',
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingTop: 18,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  icon: { fontSize: 36, color: '#21A053', marginBottom: 6 }, // yeşil tik
  title: { fontWeight: '700', fontSize: 16, color: '#183A66', marginTop: 4 },
  msg: { color: '#49556A', marginTop: 4, textAlign: 'center' },
  btn: {
    width: '100%',
    marginTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E6E8ED',
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: { color: '#183A66', fontWeight: '700' },
});