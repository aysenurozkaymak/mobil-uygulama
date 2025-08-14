// src/components/RatingModal.tsx
import React, { useMemo, useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (rating: number) => void;
  initialRating?: number;
  title?: string;
};

export default function RatingModal({
  visible,
  onClose,
  onSubmit,
  initialRating = 0,
  title = 'Mobil Uygulamadan\nMemnun Kaldınız mı?',
}: Props) {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => setRating(initialRating), [initialRating, visible]);

  const stars = useMemo(() => [1, 2, 3, 4, 5], []);

  const handleSend = () => {
    onSubmit?.(rating);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.backdrop}>
        <View style={s.card}>
          <View style={s.iconWrap}>
            <Text style={s.icon}>ⓘ</Text>
          </View>

          <Text style={s.title}>{title}</Text>

          <View style={s.starRow}>
            {stars.map((i) => {
              const active = i <= rating;
              return (
                <Pressable
                  key={i}
                  hitSlop={10}
                  onPress={() => setRating(i)}
                  style={s.starBtn}
                  android_ripple={{ color: '#eee' }}
                >
                  <Text style={[s.star, active ? s.starActive : s.starIdle]}>
                    {active ? '★' : '☆'}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={s.actions}>
            <TouchableOpacity style={[s.action, s.leftAction]} onPress={onClose}>
              <Text style={s.actionText}>Kapat</Text>
            </TouchableOpacity>
            <View style={s.vDivider} />
            <TouchableOpacity
              style={s.action}
              onPress={handleSend}
              disabled={rating === 0}
            >
              <Text style={[s.actionText, rating === 0 && { opacity: 0.45 }]}>
                Gönder
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 4 },
    }),
  },
  iconWrap: {
    alignSelf: 'center',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon: { color: '#16A34A', fontSize: 14, fontWeight: '700' },
  title: {
    textAlign: 'center',
    color: '#0B1324',
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 8,
  },
  starRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 6 },
  starBtn: { paddingHorizontal: 4, paddingVertical: 2 },
  star: { fontSize: 22, includeFontPadding: false },
  starIdle: { color: '#D1D5DB' },    // ince, açık gri
  starActive: { color: '#FACC15' },  // zarif altın
  actions: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    height: 44,
  },
  action: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  leftAction: { borderRightWidth: 0 },
  vDivider: { width: 1, backgroundColor: '#E5E7EB' },
  actionText: { color: '#0B2A55', fontWeight: '700' },
});
//yıldızlama sistemi için modal bileşeni