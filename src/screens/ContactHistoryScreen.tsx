// src/screens/ContactHistoryScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactHistory'>;

type HistoryItem = {
  id: string;
  type: 'SMS' | 'E‑posta' | 'Arama';
  datetime: string; // "30.01.2025 14:05"
  stage: string;    // "Başvuru Doğrulama"
  message: string;
};

export default function ContactHistoryScreen({}: Props) {
  const data = useMemo<HistoryItem[]>(
    () => [
      {
        id: '1',
        type: 'SMS',
        datetime: '30.01.2025 14:05',
        stage: 'Başvuru Doğrulama',
        message:
          '4867 Doğrulama kodu ile işleme devam edebilirsiniz. Doğrulama kodunu kimseyle paylaşmayınız',
      },
      {
        id: '2',
        type: 'SMS',
        datetime: '30.01.2025 14:05',
        stage: 'Başvuru Oluşturma',
        message: 'Başvurunuz oluşturulmuştur. Tarafınıza en kısa sürede dönüş sağlanacaktır.',
      },
    ],
    []
  );

  const [selected, setSelected] = useState<HistoryItem | null>(null);

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <Pressable style={s.card} android_ripple={{ color: '#e7edf7' }} onPress={() => setSelected(item)}>
      <View style={{ gap: 8 }}>
        <Row label="Tipi:" value={item.type} />
        <Row label="Tarih:" value={item.datetime} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={s.label}>Mesaj:</Text>
          <Text style={[s.value, { flex: 1 }]} numberOfLines={1}>
            {item.message}
          </Text>
        </View>
      </View>
      <Text style={s.chev}>›</Text>
    </Pressable>
  );

  return (
    <View style={s.container}>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, gap: 12 }}
      />

      {/* Detay Modal */}
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View style={s.modalBackdrop}>
          <View style={s.modalCard}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>İletişim Geçmiş Detay</Text>
            </View>

            {selected && (
              <View style={{ padding: 16, gap: 12 }}>
                <Row label="Tipi:" value={selected.type} large />
                <Row label="Tarih:" value={selected.datetime} />
                <Row label="Gönderim Aşaması:" value={selected.stage} />
                <Text style={s.label}>Mesaj:</Text>
                <View style={s.messageBox}>
                  <Text style={s.messageText}>{selected.message}</Text>
                </View>
              </View>
            )}

            <View style={{ padding: 16 }}>
              <TouchableOpacity style={s.closeBtn} onPress={() => setSelected(null)}>
                <Text style={s.closeBtnText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Row({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={[s.label, large && { fontSize: 15 }]}>{label} </Text>
      <Text style={[s.value, large && { fontWeight: '700', color: '#0B1324' }]}>{value}</Text>
    </View>
  );
}

const BRAND = {
  primary: '#183A66',
  border: '#E5E7EB',
  text: '#0B1324',
  sub: '#475569',
  bg: '#F8FAFC',
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: { color: BRAND.primary, fontWeight: '700' },
  value: { color: BRAND.sub },
  chev: { color: '#98A2B3', fontSize: 22, marginLeft: 8 },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: BRAND.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalTitle: { color: '#fff', fontWeight: '800', fontSize: 16 },

  messageBox: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 10,
    backgroundColor: BRAND.bg,
    padding: 12,
  },
  messageText: { color: BRAND.text, lineHeight: 20 },

  closeBtn: {
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND.primary,
  },
  closeBtnText: { color: '#fff', fontWeight: '700' },
});