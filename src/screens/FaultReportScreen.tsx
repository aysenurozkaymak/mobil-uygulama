
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import PickerField from '../components/PickerField';
import FormField from '../components/FormField';
import FileRow from '../components/FileRow';
import SuccessModal from '../components/SuccessModal';

const ALT_KATEGORI = [
  { label: 'Seçiniz', value: '' },
  { label: 'ABONE ARIZASI İHBARI', value: 'abone' },
  { label: 'GENEL ARIZA İHBARI', value: 'genel' },
  { label: 'AYDINLATMA İHBARI', value: 'aydinlatma' },
];

const MULKIYET = [
  { label: 'Seçiniz', value: '' },
  { label: 'MÜLK SAHİBİ (Şahıs)', value: 'ms_sahis' },
  { label: 'MÜLK SAHİBİ (Tüzel)', value: 'ms_tuzel' },
  { label: 'KİRACI', value: 'kiraci' },
];

const GERI_DONUS = [
  { label: 'SMS', value: 'sms' },
  { label: 'ARAMA', value: 'arama' },
  { label: 'E-POSTA', value: 'eposta' },
];

/** ---- MOCK SERVIS (yerine gerçek API koyabilirsiniz) ---- */
type TesisatData = {
  tc: string; ad: string; soyad: string; eposta: string; tel: string;
  il: string; ilce: string; bucak: string; mahalle: string; cadde: string;
  bina: string; daire: string;
};
const MOCK_DB: Record<string, TesisatData> = {
  '1234567890': {
    tc: '11111111111', ad: 'AYŞE SILA', soyad: 'KOCACIK', eposta: 'ayse@example.com', tel: '05001234567',
    il: 'VAN', ilce: 'EDREMİT', bucak: '', mahalle: 'AKIN', cadde: 'GÜNEŞ', bina: '16', daire: '1'
  }
};
async function mockFetchTesisat(no: string): Promise<TesisatData | null> {
  // gerçek senaryoda: await fetch(.../tesisat?no=${no}).then(r => r.json())
  await new Promise(r => setTimeout(r, 400));
  return MOCK_DB[no] ?? null;
}
/** ------------------------------------------------------ */

export default function FaultReportScreen() {
  // seçimler
  const [alt, setAlt] = useState('');
  const [alt2, setAlt2] = useState(''); // placeholder
  const [mulk, setMulk] = useState('');

  // tesisat
  const [tesisatNo, setTesisatNo] = useState('');
  const [tesisatYok, setTesisatYok] = useState(false);
  const [tesisatData, setTesisatData] = useState<TesisatData | null>(null);
  const [tesisatYukleniyor, setTesisatYukleniyor] = useState(false);

  // kişi bilgileri
  const [tc, setTc] = useState('');
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [eposta, setEposta] = useState('');
  const [tel, setTel] = useState('');

  // adres
  const [il, setIl] = useState('VAN');
  const [ilce, setIlce] = useState('EDREMİT');
  const [bucak, setBucak] = useState('');
  const [mahalle, setMahalle] = useState('AKIN');
  const [cadde, setCadde] = useState('GÜNEŞ');
  const [bina, setBina] = useState('16');
  const [daire, setDaire] = useState('1');
  const [donus, setDonus] = useState<'sms' | 'arama' | 'eposta'>('sms');

  // açıklama + dosyalar
  const [aciklama, setAciklama] = useState(
    'Arıza 03.02.2025 tarihinde sabah saat 09:00 civarında fark edilmiştir.'
  );
  const [file1, setFile1] = useState<string | undefined>('kimlik.pdf');
  const [file2, setFile2] = useState<string | undefined>('ariza.pdf');
  const [file3, setFile3] = useState<string | undefined>();

  const [done, setDone] = useState(false);

  const pickDummy = (setter: (s: string) => void, name: string) => () => setter(name);

  /** Tesisat No değişince otomatik sorgula (10+ hane örneği) */
  useEffect(() => {
    let alive = true;
    async function run() {
      setTesisatData(null);
      if (tesisatYok || !tesisatNo || tesisatNo.replace(/\D/g, '').length < 10) return;
      setTesisatYukleniyor(true);
      const data = await mockFetchTesisat(tesisatNo.trim());
      if (!alive) return;
      setTesisatYukleniyor(false);
      if (data) {
        setTesisatData(data);
        // alanları doldur
        setTc(data.tc); setAd(data.ad); setSoyad(data.soyad);
        setEposta(data.eposta); setTel(data.tel);
        setIl(data.il); setIlce(data.ilce); setBucak(data.bucak);
        setMahalle(data.mahalle); setCadde(data.cadde);
        setBina(data.bina); setDaire(data.daire);
      }
    }
    run();
    return () => { alive = false; };
  }, [tesisatNo, tesisatYok]);

  /** Tesisat verisi varsa alanlar kilitli */
  const isLocked = useMemo(() => Boolean(tesisatData && !tesisatYok), [tesisatData, tesisatYok]);

  /** "Tesisat No Yok" klik */
  const toggleTesisatYok = () => {
    setTesisatYok(v => {
      const next = !v;
      if (next) {         // No Yok → alanları aç ve tesisat bilgisini sıfırla
        setTesisatData(null);
      } else {
       // tekrar aktif edildiğinde kutuyu boş bırakıyoruz, kullanıcı yazarsa tekrar sorgular
      } 
      return next;
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.lg }}>
      {/* sabit Kategori */}
      <Text style={ss.labelStrong}>Kategori</Text>
      <View style={ss.readonly}><Text style={ss.readonlyText}>İHBAR</Text></View>

      {/* seçimler */}
      <PickerField label="Alt Kategori" value={alt}  onChange={setAlt}  options={ALT_KATEGORI} disabled={isLocked} />
      <PickerField label="2. Alt Kategori" value={alt2} onChange={setAlt2} options={[{label:'Seçiniz',value:''}]} disabled={isLocked} />
      <PickerField label="Mülkiyet Durumu" value={mulk} onChange={setMulk} options={MULKIYET} disabled={isLocked} />

      {/* Tesisat */}
      {!tesisatYok && (
        <FormField
          label={`Tesisat No${tesisatYukleniyor ? ' (sorgulanıyor...)' : ''}`}
          value={tesisatNo}
          onChangeText={(t) => { setTesisatNo(t); }}
          keyboardType="number-pad"
          editable={!isLocked}       // kilitliyken değişmesin
          right={
            <TouchableOpacity onPress={toggleTesisatYok} style={ss.checkbox}>
              <View style={[ss.tick, tesisatYok && ss.tickOn]} />
              <Text style={ss.cbText}>Tesisat No Yok</Text>
            </TouchableOpacity>
          }
        />
      )}
      {tesisatYok && (
        <View style={{ marginBottom: 12 }}>
          <TouchableOpacity onPress={toggleTesisatYok} style={[ss.checkbox, { alignSelf: 'flex-start' }]}>
            <View style={[ss.tick, tesisatYok && ss.tickOn]} />
            <Text style={ss.cbText}>Tesisat No Yok</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Kişisel alanlar */}
      <FormField label="T.C. Kimlik No" value={tc} onChangeText={setTc} keyboardType="number-pad" editable={!isLocked} />

      <View style={ss.row2}>
        <FormField label="Ad" value={ad} onChangeText={setAd} containerStyle={ss.colLeft} editable={!isLocked} />
        <FormField label="Soyad" value={soyad} onChangeText={setSoyad} containerStyle={ss.colRight} editable={!isLocked} />
      </View>

      <View style={ss.row2}>
        <FormField label="E-posta" value={eposta} onChangeText={setEposta} keyboardType="email-address" containerStyle={ss.colLeft} editable={!isLocked} />
        <FormField label="Telefon No" value={tel} onChangeText={setTel} keyboardType="phone-pad" containerStyle={ss.colRight} editable={!isLocked} />
      </View>

      {/* Adres */}
      <PickerField label="İl" value={il} onChange={setIl} options={[{label:'VAN', value:'VAN'}]} disabled={isLocked} />
      <PickerField label="İlçe" value={ilce} onChange={setIlce} options={[{label:'EDREMİT', value:'EDREMİT'}]} disabled={isLocked} />
      <PickerField label="Bucak/Köy" value={bucak} onChange={setBucak} options={[{label:'Seçiniz', value:''}]} disabled={isLocked} />
      <PickerField label="Mahalle" value={mahalle} onChange={setMahalle} options={[{label:'AKIN', value:'AKIN'}]} disabled={isLocked} />
      <PickerField label="Cadde/Sokak" value={cadde} onChange={setCadde} options={[{label:'GÜNEŞ', value:'GÜNEŞ'}]} disabled={isLocked} />

      <View style={ss.row2}>
        <FormField label="Bina No" value={bina} onChangeText={setBina} keyboardType="number-pad" containerStyle={ss.colLeft} editable={!isLocked} />
        <FormField label="Daire No" value={daire} onChangeText={setDaire} keyboardType="number-pad" containerStyle={ss.colRight} editable={!isLocked} />
      </View>

      <PickerField label="Geri Dönüş Türü" value={donus} onChange={v => setDonus(v as any)} options={GERI_DONUS} disabled={isLocked} />

      {/* Açıklama */}
      <FormField
        label="Açıklama"
        value={aciklama}
        onChangeText={setAciklama}
        multiline
        style={{ height: 110, textAlignVertical: 'top' }}
        editable={!isLocked}
      />

      {/* Dosyalar */}
      <FileRow label="Kimlik Fotokopisi" filename={file1} onPick={pickDummy(setFile1,'kimlik.pdf')} />
      <FileRow label="Arıza Durumunu Gösteren Belge" filename={file2} onPick={pickDummy(setFile2,'ariza.pdf')} />
      <FileRow label="Diğer" filename={file3} onPick={pickDummy(setFile3,'diger.pdf')} />

      {/* Butonlar */}
      <View style={ss.actions}>
        <TouchableOpacity style={[ss.btn, ss.cancel]}>
          <Text style={ss.btnText}>Vazgeç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ss.btn, ss.save]} onPress={() => setDone(true)}>
          <Text style={[ss.btnText, { color: '#fff' }]}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      <SuccessModal visible={done} onClose={() => setDone(false)} />
    </ScrollView>
  );
}

const ss = StyleSheet.create({
  labelStrong: {
    ...typography.p,
    color: colors.text,
    marginBottom: 6,
    fontWeight: '700',
    marginTop: spacing.md
  },
  readonly: {
    backgroundColor: '#EEF2F7',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  readonlyText: { color: '#667085' },

  // checkbox (Tesisat No Yok)
  checkbox: { flexDirection: 'row', alignItems: 'center' },
  tick: {
    width: 18, height: 18, borderRadius: 4,
    borderWidth: 1, borderColor: '#98A2B3', marginRight: 6
  },
  tickOn: { backgroundColor: '#183A66', borderColor: '#183A66' },
  cbText: { color: '#183A66', fontWeight: '700' },

  // iki kolonlu satırlar
  row2: { flexDirection: 'row', justifyContent: 'space-between' },
  colLeft:  { flex: 1, marginRight: 6 },
  colRight: { flex: 1, marginLeft:  6 },

  // butonlar
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    gap: 12
  },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  cancel: { backgroundColor: '#4B5563' },
  save: { backgroundColor: '#183A66' },
  btnText: { color: '#E6E8ED', fontWeight: '700' },
});