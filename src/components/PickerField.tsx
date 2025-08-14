
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Option = { label: string; value: string };
type PickerFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  disabled?: boolean;
};

export default function PickerField({
  label, value, onChange, options, disabled = false,
}: PickerFieldProps) {
  return (
    <View style={s.wrap}>
      <Text style={s.label}>{label}</Text>
      <View style={[s.input, disabled && s.inputDisabled]}>
        <Picker
          enabled={!disabled}          // kilitleme
          selectedValue={value}
          onValueChange={(v) => onChange(String(v))}
          mode="dropdown"              // iOS’ta da düzgün
        >
          {options.map(o => (
            <Picker.Item key={o.value} label={o.label} value={o.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { marginBottom: 6, color: '#111827', fontWeight: '600' },
  input: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8,
    overflow: 'hidden', backgroundColor: '#fff',
  },
  inputDisabled: { opacity: 0.6 },
}); 