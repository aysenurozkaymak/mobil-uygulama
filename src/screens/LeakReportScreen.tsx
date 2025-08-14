// src/screens/LeakReportScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors, spacing, typography } from '../theme';

export default function LeakReportScreen({ navigation }) {
  const [kategori] = useState('İHBAR');
  const [altKategori] = useState('KAÇAK İHBAR');
  const [ikinciAltKategori, setIkinciAltKategori] = useState('');
  const [il, setIl] = useState('');
  const [ilce, setIlce] = useState('');
  const [bucak, setBucak] = useState('');
  const [mahalle, setMahalle] = useState('');
  const [cadde, setCadde] = useState('');
  const [binaNo, setBinaNo] = useState('');
  const [daireNo, setDaireNo] = useState('');
  const [aciklama, setAciklama] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
      
      <Text style={styles.label}>Kategori</Text>
      <TextInput style={styles.input} value={kategori} editable={false} />

      <Text style={styles.label}>Alt Kategori</Text>
      <TextInput style={styles.input} value={altKategori} editable={false} />

      <Text style={styles.label}>2. Alt Kategori</Text>
      <Picker selectedValue={ikinciAltKategori} onValueChange={(v) => setIkinciAltKategori(v)} style={styles.picker}>
        <Picker.Item label="Seçiniz" value="" />
        <Picker.Item label="Seçenek 1" value="1" />
        <Picker.Item label="Seçenek 2" value="2" />
      </Picker>

      <Text style={styles.label}>İl</Text>
      <Picker selectedValue={il} onValueChange={(v) => setIl(v)} style={styles.picker}>
        <Picker.Item label="Seçiniz" value="" />
        <Picker.Item label="İstanbul" value="istanbul" />
      </Picker>

      <Text style={styles.label}>İlçe</Text>
      <Picker selectedValue={ilce} onValueChange={(v) => setIlce(v)} style={styles.picker}>
        <Picker.Item label="Seçiniz" value="" />
      </Picker>

      <Text style={styles.label}>Bucak/Köy</Text>
      <Picker selectedValue={bucak} onValueChange={(v) => setBucak(v)} style={styles.picker}>
        <Picker.Item label="Seçiniz" value="" />
      </Picker>

      <Text style={styles.label}>Mahalle</Text>
      <Picker selectedValue={mahalle} onValueChange={(v) => setMahalle(v)} style={styles.picker}>
        <Picker.Item label="Seçiniz" value="" />
      </Picker>

      <Text style={styles.label}>Cadde/Sokak</Text>
      <Picker selectedValue={cadde} onValueChange={(v) => setCadde(v)} style={styles.picker}>
        <Picker.Item label="Seçiniz" value="" />
      </Picker>

      <Text style={styles.label}>Bina No</Text>
      <TextInput style={styles.input} value={binaNo} onChangeText={setBinaNo} />

      <Text style={styles.label}>Daire No</Text>
      <TextInput style={styles.input} value={daireNo} onChangeText={setDaireNo} />

      <Text style={styles.label}>Açıklama</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        multiline
        value={aciklama}
        onChangeText={setAciklama}
      />
{/* Diğer */}
<Text style={styles.label}>Diğer</Text>
<View style={styles.fileRow}>
  <TouchableOpacity style={styles.fileButton}>
    <Text style={styles.fileButtonText}>Dosya Seç</Text>
  </TouchableOpacity>
  <Text style={styles.fileLabel}>Dosya Seçilmedi</Text>
</View>

      {/* Butonlar */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Vazgeç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]}>
          <Text style={styles.saveText}>Kaydet</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  label: {
    ...typography.p,
    marginBottom: 4,
    marginTop: 12,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  button: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#555',
    marginRight: spacing.sm,
  },
  saveButton: {
    backgroundColor: '#002B5B',
    marginLeft: spacing.sm,
  },
  fileRow: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  overflow: 'hidden',
  backgroundColor: '#fff',
  height: 40,
},
fileButton: {
  backgroundColor: '#002B5B',
  paddingHorizontal: 12,
  height: '100%',
  justifyContent: 'center',
},
fileButtonText: {
  color: '#fff',
  fontWeight: '600',
},
fileLabel: {
  marginLeft: 10,
  color: '#888',
},
  cancelText: { color: '#fff', fontWeight: '600' },
  saveText: { color: '#fff', fontWeight: '600' },
});