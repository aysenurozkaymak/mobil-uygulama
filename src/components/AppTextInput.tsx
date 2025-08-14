import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = TextInputProps & { label?: string; error?: string };

export default function AppTextInput({ label, error, style, ...rest }: Props) {
  return (
    <View style={{ marginBottom: spacing.lg }}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.textSub}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}const styles = StyleSheet.create({
  label: { ...typography.small, color: colors.textSub, marginBottom: spacing.xs },
  input: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    color: colors.text,
  },
  error: { color: colors.danger, marginTop: spacing.xs, ...typography.small },
});
