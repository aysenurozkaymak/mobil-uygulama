// src/screens/RequestFormScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestForm'>;

// RootStackParamList’ten güvenli şekilde prefill tipini türetiyoruz
type RFParams = RootStackParamList['RequestForm'];
type Prefill =
  RFParams extends { prefill?: infer P } | undefined ? P : never;

export default function RequestFormScreen({ route, navigation }: Props) {
  // route.params gelmeyebilir (guest). Default veriyoruz ki TS rahat etsin.
  const params = (route.params ?? {
    installationNo: undefined,
    prefill: undefined,
  }) as Exclude<RFParams, undefined>;

  const isPrefilled = useMemo(() => !!params.prefill, [params.prefill]);

  const [form, setForm] = useState({
    // üst seçimler
    category: '',
    subCategory: '',
    subCategory2: '',
    // kimlik / tesisat
    ownership: '',
    installationNo: params.installationNo ?? '',
    tc: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    // adres
    il: '',
    ilce: '',
    mahalle: '',
    cadde: '',
    binaNo: '',
    daireNo: '',
    // geri dönüş / not
    callbackType: '',
    note: '',
  });

  // Prefill geldiyse formu doldur
  useEffect(() => {
    if (params.prefill) {
      const p = params.prefill as Prefill;
      setForm((f) => ({
        ...f,
        ownership: p.ownership ?? f.ownership,
        installationNo: params.installationNo ?? f.installationNo,
        tc: p.tc ?? f.tc,
        name: p.name ?? f.name,
        surname: p.surname ?? f.surname,
        email: p.email ?? f.email,
        phone: p.phone ?? f.phone,
        il: p.address?.il ?? f.il,
        ilce: p.address?.ilce ?? f.ilce,
        mahalle: p.address?.mahalle ?? f.mahalle,
        cadde: p.address?.cadde ?? f.cadde,
        binaNo: p.address?.binaNo ?? f.binaNo,
        daireNo: p.address?.daireNo ?? f.daireNo,
      }));
    }
  }, [params]);

  const onChange = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSave = () => {
    // burası şimdilik demo – OTP’ye gider
    navigation.navigate('Otp', {
      tcOrVkn: form.tc || '*',
      type: 'Sahis',
      context: 'request',
    });
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <Text style={s.title}>TALEP İHBAR ŞİKAYET FORMU</Text>

      {/* Kategori alanları */}
      <Label text="Kategori" />
      <Input value={form.category} onChangeText={onChange('category')} placeholder="Seçiniz" />

      <Label text="Alt Kategori" />
      <Input value={form.subCategory} onChangeText={onChange('subCategory')} placeholder="Seçiniz" />

      <Label text="2. Alt Kategori" />
      <Input value={form.subCategory2} onChangeText={onChange('subCategory2')} placeholder="Seçiniz" />

      {/* Kimlik / Tesisat */}
      <Label text="Mülkiyet Durumu" />
      <Input value={form.ownership} onChangeText={onChange('ownership')} placeholder="Örn: MÜLK SAHİBİ (Şahıs)" />

      <Label text="Tesisat No" />
      <Input value={form.installationNo} onChangeText={onChange('installationNo')} editable={!isPrefilled} />

      <Label text="T.C. Kimlik No" />
      <Input value={form.tc} onChangeText={onChange('tc')} editable={!isPrefilled} keyboardType="number-pad" />

      <View style={s.row}>
        <View style={s.col}>
          <Label text="Ad" />
          <Input value={form.name} onChangeText={onChange('name')} editable={!isPrefilled} />
        </View>
        <View style={s.col}>
          <Label text="Soyad" />
          <Input value={form.surname} onChangeText={onChange('surname')} editable={!isPrefilled} />
        </View>
      </View>

      <View style={s.row}>
        <View style={s.col}>
          <Label text="E‑posta" />
          <Input value={form.email} onChangeText={onChange('email')} editable={!isPrefilled} keyboardType="email-address" />
        </View>
        <View style={s.col}>
          <Label text="Telefon No" />
          <Input value={form.phone} onChangeText={onChange('phone')} editable={!isPrefilled} keyboardType="phone-pad" />
        </View>
      </View>

      {/* Adres */}
      <Label text="İl" />
      <Input value={form.il} onChangeText={onChange('il')} />

      <Label text="İlçe" />
      <Input value={form.ilce} onChangeText={onChange('ilce')} />

      <Label text="Mahalle" />
      <Input value={form.mahalle} onChangeText={onChange('mahalle')} />

      <Label text="Cadde/Sokak" />
      <Input value={form.cadde} onChangeText={onChange('cadde')} />

      <View style={s.row}>
        <View style={s.col}>
          <Label text="Bina No" />
          <Input value={form.binaNo} onChangeText={onChange('binaNo')} />
        </View>
        <View style={s.col}>
          <Label text="Daire No" />
          <Input value={form.daireNo} onChangeText={onChange('daireNo')} />
        </View>
      </View>

      {/* Geri dönüş / Not */}
      <Label text="Geri Dönüş Türü" />
      <Input value={form.callbackType} onChangeText={onChange('callbackType')} placeholder="SMS / ARAMA / E‑POSTA" />

      <Label text="Açıklama" />
      <TextInput
        style={[s.input, { height: 100, textAlignVertical: 'top' }]}
        multiline
        placeholder="Giriniz"
        value={form.note}
        onChangeText={onChange('note')}
      />

      {/* Kaydet */}
      <TouchableOpacity style={s.cta} onPress={onSave}>
        <Text style={s.ctaTxt}>Kaydet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* -------------- küçük yardımcı bileşenler -------------- */
function Label({ text }: { text: string }) {
  return <Text style={s.label}>{text}</Text>;
}
function Input(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput {...props} style={[s.input, props.style]} placeholderTextColor="#9AA4B2" />;
}

/* -------------- stiller -------------- */
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontWeight: '800', color: '#0B1324', marginBottom: 12, fontSize: 16 },
  label: { marginTop: 12, marginBottom: 6, color: '#334155', fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#F8FAFC',
    color: '#0B1324',
  },
  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  cta: {
    marginTop: 18,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#183A66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});