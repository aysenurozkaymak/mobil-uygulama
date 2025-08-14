import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from 'react-native';
import { PngIcon } from '../components/PngIcon';
import { colors, spacing, typography } from '../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'GuestMenu'>;

const ITEMS = [
  { key: 'OutageInquiry', title: 'Kesinti Sorgulama', icon: 'elektrik' as const },
  { key: 'LeakReport',    title: 'Kaçak İhbarı',     icon: 'dikkat'   as const },
  { key: 'FaultReport',   title: 'Arıza İhbarı',     icon: 'uyari'    as const },
  { key: 'Contact',       title: 'İletişim',         icon: 'telefon'  as const },
];

export default function GuestMenuScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={ITEMS}
        keyExtractor={(i) => i.key}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        renderItem={({ item }) => (
          <Pressable
            android_ripple={{ color: '#ffffffff' }}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => navigation.navigate(item.key as any)}
          >
            <View style={styles.left}>
              <View style={styles.iconCapsule}>
                <PngIcon name={item.icon} size={40} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <PngIcon name="ok" size={40} tintColor={colors.textSub} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
  listContent: { padding: spacing.lg },

  container: {
flex: 1,

  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,

    // shadow / elevation
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
      },
    }),
  },
  cardPressed: {
    transform: [{ scale: 0.995 }],
  },

  left: { flexDirection: 'row', alignItems: 'center' },

  iconCapsule: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  title: {
    ...typography.p,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});