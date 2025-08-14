// src/screens/RequestStartScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import BottomBar from '../components/BottomBar';
import { colors, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestStart'>;

export default function RequestStartScreen({ navigation }: Props) {
  return (
    <View style={s.root}>
      <View style={s.topBar} />
      <View style={s.body}>
        <Pressable style={s.cta} onPress={() => navigation.navigate('RequestSelectInstallation')}>
          <Text style={s.ctaText}>Yeni Başvuru Oluştur</Text>
        </Pressable>

        <View style={s.empty}>
          <Text style={s.emptyIcon}>!</Text>
          <Text style={s.emptyText}>Başvuru Bulunmamaktadır</Text>
        </View>
      </View>

      <BottomBar active="home" navigation={navigation} />
    </View>
  );
}

const s = StyleSheet.create({
  root:{ flex:1, backgroundColor:'#fff' },
  topBar:{ height:44, backgroundColor:'#183A66' },
  body:{ flex:1, alignItems:'center', paddingTop:spacing.xl },
  cta:{ backgroundColor:'#183A66', paddingVertical:12, paddingHorizontal:18, borderRadius:6 },
  ctaText:{ color:'#fff', fontWeight:'700' },
  empty:{ marginTop:spacing.xl, alignItems:'center' },
  emptyIcon:{ fontSize:54, color:'#F59E0B' },
  emptyText:{ ...typography.p, color:'#6B7280', marginTop:8, fontWeight:'700' },
});