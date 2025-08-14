// src/screens/CompensationScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Compensation'>;

type Result = {
  basvuruNo: string | '-';
  tesisatNo: string;
  ad: string;
  soyad: string;
  telefon: string;
  tipi: string;
  donem: string;
  yil: string | '-';
  tutar: string;
  durum: string;
};

const BRAND = {
  primary: '#183A66',
  primarySoft: '#E8EEF7',
  text: '#0B1324',
  textSub: '#6B7280',
  border: '#E5E7EB',
  card: '#FFFFFF',
  btn: '#1F3C74',
};

export default function CompensationScreen({}: Props) {
  const [mode, setMode] = useState<'tesisat' | 'telefon'>('tesisat');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const disabled = useMemo(() => input.trim().length === 0, [input]);

  const onQuery = () => {
    // DEMO: sadece aşağıdaki iki örneğe sonuç dönelim
    if (mode === 'tesisat' && input === '8547896') {
      setResult({
        basvuruNo: '-',
        tesisatNo: '8547896',
        ad: 'Ayşe Sıla',
        soyad: 'KOCACIK',
        telefon: '5555555555',
        tipi: 'Uzun Süreli Kesinti Tazminatı',
        donem: 'Kasım',
        yil: '-',
        tutar: '769,81',
        durum: 'Başvuru Bekliyor',
      });
    } else if (mode === 'telefon' && input === '5555555555') {
      setResult({
        basvuruNo: '-',
        tesisatNo: '8547896',
        ad: 'Ayşe Sıla',
        soyad: 'KOCACIK',
        telefon: '5555555555',
        tipi: 'Uzun Süreli Kesinti Tazminatı',
        donem: 'Kasım',
        yil: '-',
        tutar: '769,81',
        durum: 'Başvuru Bekliyor',
      });
    } else {
      setResult(null);
          //apiden gelen sonuçları burada işleme 
    }
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      {/* Başlık şeridi */}
      <View style={s.headerChip}>
        <Text style={s.headerChipText}>Tazminat Sorgulama</Text>
      </View>

      {/* Mod seçici */}
      <View style={s.segment}>
        <Pressable
          style={[s.segmentBtn, mode === 'tesisat' && s.segmentBtnActive]}
          onPress={() => {
            setMode('tesisat');
            setResult(null);
            setInput('');
          }}
        >
          <Text style={[s.segmentTxt, mode === 'tesisat' && s.segmentTxtActive]}>
            Tesisat No ile Sorgula
          </Text>
        </Pressable>
        <Pressable
          style={[s.segmentBtn, mode === 'telefon' && s.segmentBtnActive]}
          onPress={() => {
            setMode('telefon');
            setResult(null);
            setInput('');
          }}
        >
          <Text style={[s.segmentTxt, mode === 'telefon' && s.segmentTxtActive]}>
            Telefon No ile Sorgula
          </Text>
        </Pressable>
      </View>

      {/* Girdi */}
      <Text style={s.label}>{mode === 'tesisat' ? 'Tesisat No' : 'Telefon No'}</Text>
      <TextInput
        placeholder={mode === 'tesisat' ? 'Tesisat No Giriniz' : 'Telefon No Giriniz'}
        keyboardType="number-pad"
        value={input}
        onChangeText={setInput}
        style={s.input}
      />

      {/* Sorgula */}
      <TouchableOpacity
        style={[s.button, disabled && { opacity: 0.5 }]}
        disabled={disabled}
        onPress={onQuery}
      >
        <Text style={s.buttonTxt}>Sorgula</Text>
      </TouchableOpacity>

      {/* SONUÇ */}
      {result ? (
        <Pressable style={s.card} onPress={() => setShowDetail(true)}>
          <Row left="Başvuru No" right={result.basvuruNo} />
          <Row left="Durum" right={result.durum} />
          <Row left="Tipi" right={result.tipi} />
          <Row left="Dönem" right={result.donem} />
          <View style={s.cardArrow}>
            <Text style={s.cardArrowTxt}>Detayı Gör</Text>
            <Text style={s.chev}>›</Text>
          </View>
        </Pressable>
      ) : (
        // ilk girişte hiç bir şey göstermeyelim; arama yapılıp da bulunamazsa mesaj göstermek istersen
        // istersen burada empty state eklenebilir.
        null
      )}

      {/* Detay Modal */}
      <Modal visible={showDetail} transparent animationType="slide">
        <View style={s.modalOverlay}>
          <View style={s.sheet}>
            <View style={s.sheetHeader}>
              <View style={s.grabber} />
              <Text style={s.sheetTitle}>Tazminat Detay</Text>
            </View>

            {result && (
              <View style={s.detailBox}>
                <Row left="Başvuru No" right={result.basvuruNo} strong />
                <Row left="Tesisat No" right={result.tesisatNo} />
                <Row left="Ad" right={result.ad} />
                <Row left="Soyad" right={result.soyad} />
                <Row left="Telefon No" right={result.telefon} />
                <Row left="Tipi" right={result.tipi} />
                <Row left="Dönem" right={result.donem} />
                <Row left="Yıl" right={result.yil} />
                <Row left="Tazminat Tutarı" right={result.tutar + ' TL'} />
                <Row left="Durum" right={result.durum} />
              </View>
            )}

            <TouchableOpacity style={[s.button, { marginTop: 16 }]} onPress={() => setShowDetail(false)}>
              <Text style={s.buttonTxt}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function Row({ left, right, strong = false }: { left: string; right: string; strong?: boolean }) {
  return (
    <View style={s.row}>
      <Text style={[s.rowLeft, strong && { fontWeight: '800' }]}>{left}:</Text>
      <Text style={s.rowRight}>{right}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB' },

  headerChip: {
    alignSelf: 'center',
    backgroundColor: BRAND.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 14,
  },
  headerChipText: { color: '#fff', fontWeight: '800' },

  segment: {
    flexDirection: 'row',
    backgroundColor: BRAND.primarySoft,
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: { backgroundColor: '#fff', borderWidth: 1, borderColor: BRAND.primary },
  segmentTxt: { color: BRAND.textSub, fontWeight: '600' },
  segmentTxtActive: { color: BRAND.primary },

  label: { color: BRAND.text, fontWeight: '700', marginTop: 8, marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
  },

  button: {
    backgroundColor: BRAND.btn,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  buttonTxt: { color: '#fff', fontWeight: '700' },

  card: {
    backgroundColor: BRAND.card,
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  rowLeft: { flex: 1, color: BRAND.textSub, fontWeight: '700' },
  rowRight: { flex: 1.2, color: BRAND.text },

  cardArrow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: BRAND.border,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardArrowTxt: { color: BRAND.primary, fontWeight: '700', marginRight: 6 },
  chev: { color: BRAND.primary, fontSize: 18 },

  // modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  sheetHeader: { alignItems: 'center', marginBottom: 8 },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginBottom: 8,
  },
  sheetTitle: { fontWeight: '800', color: BRAND.text },
  detailBox: {
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
    marginTop: 8,
  },
});