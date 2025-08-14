// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Modal,
} from 'react-native';
import InfoModal from '../components/InfoModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const KVKK_TEXT = `KİŞİSEL VERİLERİNİN KORUNMASI VE İŞLENMESİ AYDINLATMA METNİ
(6698 sayılı KVKK uyarınca)

1) VERİ SORUMLUSU 
Veri Sorulusu: VEDAŞ 
Adres: Süphan Mahallesi Sümerbank Caddesi Vedaş Sitesi B Blok No:9 Edremit / VAN
İletişim: [0 (850) 211 0 186] - [vangoluelektrikdagitim@hs03.kep.tr] - [www.vedas.com.tr]

2) AMAÇ VE KAPSAM
Bu aydınlatma metni, Şirket'in ROTA CRM mobil ugulaması ve diğer kanallar üzerinden yürüttüğü işlemler kapsamında kişisel verilerinizin işlenmesine ilişkin usul ve esaslar hakkında bilgi vermek amacıyla hazırlanmıştır. saklanması ve aktarılması süreçleri hakkında bilgilendirme yapmak amacıyla hazırlanmıştır. 


3) İŞLENEN KİŞİSEL VERİ KATEGORİLERİ
• Kimlik: Ad-soyad, T.C. Kimlik/ Vergi No, imza bilgisi
• İletişim: Telefon, e-posta, adres, il/ilçe
• Müşteri/Abonelik İşlemi: Başvuru/şikâyet kayıtları, işlem geçmişi, talep içerikleri
• İşlem Güvenliği: Oturum, doğrulama kodu (OTP), log kayıtları, tarih-saat damgaları
• Finans/Ödeme: Fatura, tahsilat ve ödeme bilgileri (kart verisi saklanmaz; ödeme kuruluşu üzerinden alınır)
• Teknik: Cihaz/uygulama sürümü, hata kayıtları, IP/cihaz ID (güvenlik ve performans için)
• Görsel/İşitsel (varsa): Eklenen belge/fotoğraf

4) KİŞİSEL VERİ TOPLAMA YÖNTEMLERİ
Veriler; mobil uygulama, çağrı merkezi, web formları, e-posta, entegrasyonlar ve yasal bildirim kanalları üzerinden elektronik/otomatik yollarla elde edilir.

5) İŞLEME AMAÇLARI
• Kimlik doğrulama ve kullanıcı hesabı yönetimi
• Başvuru/şikâyet/arıza süreçlerinin yürütülmesi ve müşteri desteği
• Ödeme ve faturalama işlemlerinin yürütülmesi
• Sözleşme ve mevzuat kaynaklı yükümlülüklerin yerine getirilmesi
• Hizmet kalitesi, güvenlik, performans ve hata/arıza tespiti
• Talep üzerine bilgilendirme ve yasal mercilere karşı yükümlülükler
• (Açık rızanız varsa) kişiselleştirme ve isteğe bağlı bildirimler

6) HUKUKİ SEBEPLER
KVKK m.5/2 uyarınca:
(a) Kanunlarda açıkça öngörülmesi,
(c) Sözleşmenin kurulması/ifasıyla doğrudan ilgili olması,
(ç) Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi,
(f) Meşru menfaat için veri işlemenin zorunlu olması.
Açık rızaya dayalı işlemede KVKK m.5/1 uygulanır.

7) AKTARIM
• Yasal zorunluluklar kapsamında yetkili kamu kurum ve kuruluşları,
• Tedarikçiler ve hizmet sağlayıcıları (BT, barındırma, çağrı merkezi, SMS/e-posta, ödeme kuruluşu vb.),
• İş ortakları ve grup şirketleri (süreç bazlı ve gerekli olduğu ölçüde).
Yurtdışı aktarım: Kural olarak yurtdışına aktarım yapılmaz. Zorunlu hâle gelmesi hâlinde KVKK m.9 ve Kurul kararlarına uygun yöntemler (yeterli ülke/taahhütname/açık rıza) uygulanır.

8) SAKLAMA SÜRELERİ
• Sözleşmesel ve müşteri işlem verileri: 10 yıla kadar (TBK/TTK yükümlülükleri)
• Muhasebe/finans verileri: 10 yıl (VUK)
• Çağrı/başvuru kayıtları ve loglar: 3–10 yıl arası süreç ve mevzuata göre
Süre sonunda veriler mevzuata uygun olarak anonimleştirilir veya silinir/imha edilir.

9) HAKLARINIZ (KVKK m.11)
Bize başvurarak;
• Kişisel verilerinizin işlenip işlenmediğini öğrenme,
• İşleme amaçlarını ve uygun kullanımı sorgulama,
• Yurt içi/yurt dışı aktarım yapılan üçüncü kişileri öğrenme,
• Eksik/yanlış işlenen verilerin düzeltilmesini isteme,
• Silme/imha/anonimleştirme talep etme (mevzuat izin verdiği ölçüde),
• Otomatik işleme sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
• Zarara uğramanız hâlinde tazminat talep etme
haklarına sahipsiniz.

10) BAŞVURU YÖNTEMİ
Başvurularınızı KVKK Başvuru Formu üzerinden veya “Veri Sahibi Başvurusu” başlıklı dilekçe ile
• E-posta (Kayıtlı/KKEP var ise KEP üzerinden): [kvkk@… / kep@…],
• Posta/elden: [Adres],
• Uygulama içi talep/şikâyet menüsü
kanallarıyla iletebilirsiniz. Başvurularınız 30 gün içinde yanıtlanacaktır.

11) GÜVENLİK
Şirket; erişim kontrolü, şifreleme (uygulanabildiği ölçüde), loglama, ağ güvenliği, yedekleme ve saklama politikaları gibi idari ve teknik tedbirleri uygular. Ödeme işlemlerinde kart verileri Şirket tarafından tutulmaz; yetkili ödeme kuruluşları üzerinden işlenir.

12) GÜNCELLEME
Bu metin ihtiyaç hâlinde güncellenebilir. Güncel sürüm uygulama içinde ve/veya web sitemizde yayımlanır.
Yürürlük Tarihi: -
Sürüm: v1.0`;

const LoginScreen = ({ navigation }: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedType, setSelectedType] = useState<'Sahis' | 'Tuzel'>('Sahis');
  const [captcha] = useState('8De6');
  const [tc, setTc] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [notFound, setNotFound] = useState(false); // <-- kayıt bulunamadı modalı
  const [showKvkk, setShowKvkk] = useState(false); // <-- KVKK metni modalı

  const handleLogin = () => {
    if (!isChecked) return alert('Lütfen KVKK onay kutusunu işaretleyin.');
    if (!tc || !captchaInput) return alert('Lütfen tüm alanları doldurun.');
    if (captchaInput !== captcha) return alert('Güvenlik kodu hatalı.');

    // Demo: yalnızca "G00000000001" ise kayıt var; aksi halde modal
    if (tc !== 'G00000000001') {
      setNotFound(true);
      return;
    }

    navigation.navigate('Otp', {
      tcOrVkn: tc,
      type: selectedType,
      context: 'login',
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/rota.png')} style={styles.logo} />
        </View>

        <Text style={styles.title}>Hoş geldiniz!</Text>
        <Text style={styles.subtitle}>
          Sistemde kayıtlı bilgilerinizle giriş yapabilirsiniz.
        </Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setSelectedType('Sahis')}
            style={[styles.tabButton, selectedType === 'Sahis' && styles.tabButtonActive]}
          >
            <Text style={[styles.tabButtonText, selectedType === 'Sahis' && styles.tabButtonTextActive]}>
              Şahıs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType('Tuzel')}
            style={[styles.tabButton, selectedType === 'Tuzel' && styles.tabButtonActive]}
          >
            <Text style={[styles.tabButtonText, selectedType === 'Tuzel' && styles.tabButtonTextActive]}>
              Tüzel
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="T.C. Kimlik / Vergi No"
          style={styles.input}
          keyboardType="numeric"
          value={tc}
          onChangeText={setTc}
        />

        <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkboxChecked]} />
          <Text style={styles.checkboxText}>
            Kişisel Verilerin Korunması ve İşlenmesi Aydınlatma Metni’ni okudum, anladım.{' '}
            <Text style={styles.link} onPress={() => setShowKvkk(true)}>Metni Gör</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.captchaContainer}>
          <View style={styles.captchaBox}>
            <Text style={styles.captchaText}>{captcha}</Text>
          </View>
          <TextInput
            placeholder="Girin"
            style={[styles.input, { flex: 1, marginLeft: 8 }]}
            value={captchaInput}
            onChangeText={setCaptchaInput}
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, (!isChecked || !tc || !captchaInput) && { opacity: 0.5 }]}
          disabled={!isChecked || !tc || !captchaInput}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sublessButton} onPress={() => navigation.navigate('GuestMenu')}>
          <Text style={styles.sublessButtonText}>Abonesiz İşlemler</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Kayıt bulunamadı modalı */}
      <InfoModal visible={notFound} onClose={() => setNotFound(false)} />

      {/* KVKK Metni Modalı */}
      <Modal visible={showKvkk} transparent animationType="slide" onRequestClose={() => setShowKvkk(false)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Aydınlatma Metni</Text>
              <TouchableOpacity onPress={() => setShowKvkk(false)}>
                <Text style={styles.sheetClose}>Kapat</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }}>
              <Text style={styles.sheetBody}>{KVKK_TEXT}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f7fa',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: { alignItems: 'center', marginBottom: 12 },
  logo: { width: 180, height: 180, resizeMode: 'contain' },
  title: { fontSize: 20, fontWeight: '600', marginTop: 12, textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 24, color: '#555' },
  tabContainer: { flexDirection: 'row', marginBottom: 12, justifyContent: 'center' },
  tabButton: { paddingVertical: 10, paddingHorizontal: 22, borderBottomWidth: 2, borderColor: 'transparent', marginHorizontal: 8 },
  tabButtonActive: { borderColor: '#007AFF' },
  tabButtonText: { fontSize: 16, color: '#888' },
  tabButtonTextActive: { color: '#007AFF', fontWeight: 'bold' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginVertical: 8, borderWidth: 1, borderColor: '#ccc' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 8 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: '#666', marginRight: 10, marginTop: 5 },
  checkboxChecked: { backgroundColor: '#007AFF' },
  checkboxText: { flex: 1, fontSize: 14, color: '#333' },
  link: { color: '#007AFF', textDecorationLine: 'underline', fontWeight: '700' },
  captchaContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  captchaBox: { backgroundColor: '#eee', padding: 10, borderRadius: 6, minWidth: 60, alignItems: 'center' },
  captchaText: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  loginButton: { backgroundColor: '#0a66ff', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sublessButton: { backgroundColor: '#333', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  sublessButtonText: { color: '#fff', fontSize: 16 },

  // Modal stilleri
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    height: '60%',    
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
  },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sheetTitle: { fontSize: 16, fontWeight: '700', color: '#0B1324' },
  sheetClose: { fontSize: 14, fontWeight: '700', color: '#007AFF' },
  sheetBody: { fontSize: 14, lineHeight: 20, color: '#0B1324', marginTop: 12 as any },
});