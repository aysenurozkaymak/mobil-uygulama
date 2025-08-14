import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

export default function ApplicationStatusScreen() {
  const [phone, setPhone] = useState('');
  const [appNo, setAppNo] = useState('');
  return (
    <View style={styles.c}>
      <Text style={styles.h}>Başvuru Durumları</Text>
      <TextInput value={phone} onChangeText={setPhone} placeholder="Telefon No" keyboardType="phone-pad" style={styles.i} />
      <TextInput value={appNo} onChangeText={setAppNo} placeholder="Başvuru No (opsiyonel)" style={styles.i} />
      <TouchableOpacity style={styles.b}><Text style={styles.bt}>Sorgula</Text></TouchableOpacity>
      <Text style={styles.sub}>Örnek çıktı: BSV-0001 | Talep / Elektrik Arızası | 30.01.2025 14:35</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  c:{ flex:1, backgroundColor:colors.bg, padding:spacing.xl },
  h:{ ...typography.h1, color:colors.text, marginBottom:spacing.md },
  i:{ backgroundColor:'#fff', borderRadius:12, borderWidth:1, borderColor:colors.border, padding:12, color:colors.text, marginBottom:spacing.sm },
  b:{ backgroundColor:colors.primary, padding:14, borderRadius:12, alignItems:'center', marginTop:spacing.md },
  bt:{ color:'#fff', ...typography.h2 },
  sub:{ color:colors.textSub, marginTop:spacing.lg }
});
