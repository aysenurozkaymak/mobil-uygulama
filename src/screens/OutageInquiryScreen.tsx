// src/screens/OutageInquiryScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';


import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';

type Props = NativeStackScreenProps<RootStackParamList, 'OutageInquiry'>;

function fmt(d: Date) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = d.getFullYear();
  return `${dd}.${mm}.${yy}`;
}

export default function OutageInquiryScreen({ navigation }: Props) {
  const [start, setStart] = useState<Date>(new Date(2025, 0, 30));
  const [end, setEnd] = useState<Date>(new Date(2025, 0, 30));

  const [mode, setMode] = useState<'install' | 'address'>('install');

  // install mode
  const [installationNo, setInstallationNo] = useState(''); // 8547896 -> özel durum

  // address mode (mock değerler)
  const [il, setIl] = useState<string | null>(null);
  const [ilce, setIlce] = useState<string | null>(null);
  const [mahalle, setMahalle] = useState<string | null>(null);

  const [ran, setRan] = useState(false);

  const planned = useMemo(() => {
    if (!ran) return null;
    if (mode === 'install') {
      // 8547896 için planlı YOK
      return installationNo === '8547896' ? [] : [];
    } else {
      // VAN/EDREMİT/YENİ CAMİ => 1 adet planlı
      if (il === 'VAN' && ilce === 'EDREMİT' && mahalle === 'YENİ CAMİ') {
        return [
          {
            start: '30.01.2025 09:00',
            end: '30.01.2025 09:30',
            note:
              'PLANLI BAKIM ONARIM ÇALIŞMASI NEDENİ İLE ENERJİ KESİNTİSİ YAŞANMAKTADIR.',
          },
        ];
      }
      return [];
    }
  }, [ran, mode, installationNo, il, ilce, mahalle]);

  const unplanned = useMemo(() => {
    if (!ran) return null;
    // Bu demo’da her iki modda da plansız yok
    return [];
  }, [ran]);

  const openPicker = (which: 'start' | 'end') => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode: 'date',
        value: which === 'start' ? start : end,
        onChange: (_e, d) => {
          if (!d) return;
          which === 'start' ? setStart(d) : setEnd(d);
        },
      });
    }
  };

  const onRun = () => {
    // min doğrulama
    if (mode === 'install' && !installationNo) return alert('Tesisat No giriniz');
    if (mode === 'address' && (!il || !ilce || !mahalle))
      return alert('Adres bilgilerini seçiniz');
    setRan(true);
  };

  // basit dropdown taklidi
  const Select = ({
    label,
    value,
    options,
    onPick,
  }: {
    label: string;
    value: string | null;
    options: string[];
    onPick: (s: string) => void;
  }) => (
    <View style={{ marginTop: 12 }}>
      <Text style={s.label}>{label}</Text>
      <View style={s.inputWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {options.map((o) => (
            <Pressable
              key={o}
              onPress={() => onPick(o)}
              style={[s.chip, value === o && s.chipActive]}
            >
              <Text style={[s.chipTxt, value === o && s.chipTxtActive]}>{o}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FB' }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header şerit */}
        <View style={s.bar}>
          <Text style={s.barTitle}>Kesinti Bilgileri</Text>
        </View>

        {/* Tarihler */}
        <View style={s.row2}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Başlangıç</Text>
            <Pressable onPress={() => openPicker('start')} style={s.input}>
              <Text style={s.inputTxt}>{fmt(start)}</Text>
            </Pressable>
            {Platform.OS === 'ios' && (
              <DateTimePicker
                value={start}
                mode="date"
                onChange={(_, d) => d && setStart(d)}
                style={{ marginTop: 8 }}
              />
            )}
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Bitiş</Text>
            <Pressable onPress={() => openPicker('end')} style={s.input}>
              <Text style={s.inputTxt}>{fmt(end)}</Text>
            </Pressable>
            {Platform.OS === 'ios' && (
              <DateTimePicker
                value={end}
                mode="date"
                onChange={(_, d) => d && setEnd(d)}
                style={{ marginTop: 8 }}
              />
            )}
          </View>
        </View>

        {/* Mod seçici */}
        <View style={s.segment}>
          <Pressable
            onPress={() => setMode('install')}
            style={[s.segBtn, mode === 'install' && s.segBtnActive]}
          >
            <Text style={[s.segTxt, mode === 'install' && s.segTxtActive]}>
              Tesisat No ile
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('address')}
            style={[s.segBtn, mode === 'address' && s.segBtnActive]}
          >
            <Text style={[s.segTxt, mode === 'address' && s.segTxtActive]}>
              Adres ile
            </Text>
          </Pressable>
        </View>

        {mode === 'install' ? (
          <View style={{ marginTop: 12 }}>
            <Text style={s.label}>Tesisat No</Text>
            <TextInput
              placeholder="Tesisat No Giriniz"
              placeholderTextColor="#9AA4B2"
              value={installationNo}
              onChangeText={setInstallationNo}
              keyboardType="number-pad"
              style={s.input}
            />
          </View>
        ) : (
          <>
            <Select
              label="İl"
              value={il}
              options={['VAN']}
              onPick={(v) => {
                setIl(v);
                setIlce(null);
                setMahalle(null);
              }}
            />
            <Select
              label="İlçe"
              value={ilce}
              options={il ? ['EDREMİT'] : []}
              onPick={(v) => {
                setIlce(v);
                setMahalle(null);
              }}
            />
            <Select
              label="Mahalle"
              value={mahalle}
              options={ilce ? ['YENİ CAMİ'] : []}
              onPick={setMahalle}
            />
          </>
        )}

        <Pressable style={s.cta} onPress={onRun}>
          <Text style={s.ctaTxt}>Sorgula</Text>
        </Pressable>

        {/* Sonuçlar */}
        {ran && (
          <>
            <Text style={[s.sectionTitle, { marginTop: 8 }]}>Planlı Kesintiler</Text>
            {planned && planned.length === 0 && (
              <View style={[s.alert, s.alertDanger]}>
                <Text style={s.alertStrong}>
                  {mode === 'install'
                    ? `${installationNo} tesisat numarasına ait`
                    : `${(il || '-')}/${(ilce || '-')}/${(mahalle || '-')}`}{" "}
                </Text>
                <Text style={s.alertTxt}>planlı kesinti bulunmamaktadır.</Text>
              </View>
            )}
            {planned && planned.length > 0 && (
              <View style={[s.alert, s.alertSuccess]}>
                <Text style={s.bold}>Bu bölgede planlı 1 Adet kesinti bulunmaktadır.</Text>
                <View style={{ height: 10 }} />
                <Text style={s.kv}>
                  <Text style={s.bold}>Başlangıç Tarihi: </Text>30.01.2025 09:00
                </Text>
                <Text style={s.kv}>
                  <Text style={s.bold}>Bitiş Tarihi: </Text>30.01.2025 09:30
                </Text>
                <Text style={s.kv}>
                  <Text style={s.bold}>Açıklama: </Text>
                  PLANLI BAKIM ONARIM ÇALIŞMASI NEDENİ İLE ENERJİ KESİNTİSİ YAŞANMAKTADIR.
                </Text>
              </View>
            )}

            <Text style={s.sectionTitle}>Plansız Kesintiler</Text>
            {unplanned && unplanned.length === 0 && (
              <View style={[s.alert, s.alertDanger]}>
                <Text style={s.alertStrong}>
                  {mode === 'install'
                    ? `${installationNo} tesisat numarasına ait`
                    : `${(il || '-')}/${(ilce || '-')}/${(mahalle || '-')}`}{" "}
                </Text>
                <Text style={s.alertTxt}>plansız kesinti bulunmamaktadır.</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

     
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    backgroundColor: '#183A66',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  barTitle: { color: '#fff', fontWeight: '800', textAlign: 'center', fontSize: 16 },

  row2: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 8 },

  label: { color: '#344256', fontWeight: '700', marginBottom: 6 },

  input: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  inputWrap: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  inputTxt: { color: '#0B1324', fontWeight: '600' },

  segment: {
    marginTop: 16,
    backgroundColor: '#ECEFF5',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 4,
  },
  segBtn: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  segTxt: { color: '#5B6576', fontWeight: '700' },
  segTxtActive: { color: '#183A66' },

  chip: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  chipActive: { borderColor: '#183A66', backgroundColor: '#F1F5FF' },
  chipTxt: { color: '#607089', fontWeight: '600' },
  chipTxtActive: { color: '#183A66' },

  cta: {
    alignSelf: 'center',
    marginTop: 16,
    height: 44,
    paddingHorizontal: 28,
    borderRadius: 10,
    backgroundColor: '#183A66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTxt: { color: '#fff', fontWeight: '800' },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 8,
    color: '#0B1324',
    fontWeight: '800',
  },

  alert: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  alertDanger: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  alertSuccess: {
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#6EE7B7',
  },
  alertStrong: { color: '#b91c1c', fontWeight: '800' },
  alertTxt: { color: '#7F1D1D', fontWeight: '700' },

  kv: { color: '#064E3B', lineHeight: 20 },
  bold: { fontWeight: '800', color: '#065F46' },
});
