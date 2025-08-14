import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle
} from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = TextInputProps & {
  label: string;
  right?: React.ReactNode;
  containerStyle?: ViewStyle;
};

export default function FormField({
  label,
  right,
  style,
  containerStyle,
  ...rest
}: Props) {
  return (
    <View style={[s.wrap, containerStyle]}>
      <View style={{ marginTop: spacing.sm }}>
        <Text style={s.label}>{label}</Text>
        <View style={s.row}>
          <TextInput
            placeholderTextColor="#9AA4B2"
            style={[s.input, style]}
            {...rest}
          />
          {right ? <View style={{ marginLeft: 8 }}>{right}</View> : null}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginTop: spacing.md, flex: 1 },
  label: {
    ...typography.p,
    color: colors.text,
    marginBottom: 4,
    fontWeight: '600'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputMultiline: {
    height: 110,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
});