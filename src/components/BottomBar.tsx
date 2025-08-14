// src/components/BottomBar.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { CommonActions, useNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  active: 'account' | 'home' | 'contact';
  navigation: Nav;
  isGuest?: boolean;
  hidden?: boolean;      // <<< yeni: tamamen gizlemek için
  disabled?: boolean;    // <<< yeni: etkileşimi kilitlemek için
};

export default function BottomBar({ active, navigation, isGuest, hidden, disabled }: Props) {
  if (hidden) return null;

  const state = useNavigationState(s => s);
  const current = state?.routes?.[state.index]?.name;

  const safeGo = (name: keyof RootStackParamList) => () => {
    if (disabled || current === name) return;
    navigation.dispatch(CommonActions.navigate({ name }));
  };

  const goAccount  = safeGo('Account');
  const goHome     = safeGo('Home');
  const goContact  = safeGo(isGuest ? 'Contact' : 'ContactPersonal');

  return (
    <View style={s.wrap}>
      <View style={s.dent} />
      <TouchableOpacity style={s.item} onPress={goAccount} disabled={disabled}>
        <Image source={require('../assets/icons/tab-user.png')} style={[s.icon, active==='account' && s.iconActive]} />
        <Text style={[s.label, active==='account' && s.labelActive]}>Hesabım</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.centerButton} onPress={goHome} disabled={disabled} activeOpacity={0.9}>
        <View style={s.centerInner}>
          <Image source={require('../assets/icons/tab-home.png')} style={s.centerIcon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={s.item} onPress={goContact} disabled={disabled}>
        <Image source={require('../assets/icons/tab-phone.png')} style={[s.icon, active==='contact' && s.iconActive]} />
        <Text style={[s.label, active==='contact' && s.labelActive]}>İletişim</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... (style'lar aynı)

const BAR_BG = '#ffffff';
const BORDER = '#E5E7EB';
const TEXT = '#6B7280';
const TEXT_ACTIVE = '#111827';

const s = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: BAR_BG,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  dent: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 32,
    width: 74,
    height: 36,
    backgroundColor: BAR_BG,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
    elevation: 2,
  },
  item: {
    width: '33%',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    gap: 4,
  },
  icon: { width: 20, height: 20, opacity: 0.6 },
  iconActive: { opacity: 1 },
  label: { fontSize: 12, color: TEXT },
  labelActive: { color: TEXT_ACTIVE, fontWeight: Platform.OS === 'ios' ? '600' : '700' },

  centerButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BAR_BG,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  centerInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
  },
  centerIcon: { width: 22, height: 22 },
});