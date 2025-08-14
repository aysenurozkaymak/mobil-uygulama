// src/screens/AccountScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, typography } from '../theme';
import BottomBar from '../components/BottomBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({ navigation }: Props) {
  const handleLogout = () => {
    // (Opsiyonel) burada local storage/ctx temizliği yapabilirsin
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <View style={{ flex: 1 }}>
          <Text style={s.hello}>Merhaba,</Text>
          <Text style={s.user}>AYŞE SILA KOCACIK</Text>
        </View>
        <Image source={require('../assets/images/rota.png')} style={s.logo} />
      </View>

      {/* Rows */}
      <View style={s.cardWrap}>
        <Row
          title="Kişisel Bilgilerim"
          onPress={() => navigation.navigate('PersonalInfo')}
        />
        <Row
          title="Tesisat Bilgileri"
          // Detay ekrana doğrudan gidilmez; önce listeye gidiyoruz
          onPress={() => navigation.navigate('InstallationList')}
          topBorder
        />
      </View>

      {/* Logout */}
      <Pressable
        style={s.logout}
        android_ripple={{ color: '#e7ecf5' }}
        onPress={handleLogout}
      >
        <Text style={s.logoutText}>Çıkış Yap</Text>
      </Pressable>

      {/* Tab bar */}
      <BottomBar active="account" navigation={navigation} />
    </View>
  );
}

function Row({
  title,
  onPress,
  topBorder,
}: {
  title: string;
  onPress: () => void;
  topBorder?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={[s.row, topBorder && s.rowTopBorder]}>
      <Text style={s.rowText}>{title}</Text>
      <Text style={s.chev}>›</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 90 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  hello: { ...typography.p, color: '#183A66', fontWeight: '700' },
  user: { color: '#0B1324', fontWeight: '800', marginTop: 2 },
  logo: { width: 60, height: 80, resizeMode: 'contain', marginLeft: spacing.md },

  cardWrap: {
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  row: {
    height: 56,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTopBorder: { borderTopWidth: 1, borderTopColor: '#EEF2F7' },
  rowText: { ...typography.p, color: '#0B1324', fontWeight: '600' },
  chev: { fontSize: 24, color: '#94A3B8', marginTop: -2 },

  logout: {
    alignSelf: 'center',
    marginTop: spacing.xl,
    backgroundColor: '#183A66',
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: { color: '#fff', fontWeight: '700' },
});