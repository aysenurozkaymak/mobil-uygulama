import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
};

export default function AppButton({ title, onPress, loading, variant = 'primary' }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.btn, variant === 'secondary' && styles.secondary]}
      onPress={onPress}
      disabled={!!loading}
    >
      {loading ? <ActivityIndicator/> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondary: { backgroundColor: colors.textSub },
  text: { ...typography.h2, color: '#fff' },
});
