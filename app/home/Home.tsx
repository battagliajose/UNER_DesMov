
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AUTH_ROUTES } from '../../utils/constants';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { materialColors } from '../../utils/colors';

type RootStackParamList = {
  [AUTH_ROUTES.HOME]: undefined;
  [AUTH_ROUTES.FICHAR]: undefined;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, typeof AUTH_ROUTES.HOME>;

export default function Home({ navigation }: HomeProps) {
  const theme = materialColors.schemes.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.onBackground }]}>
          Home Screen
        </Text>
        <Button
          title="Ir a Fichar"
          onPress={() => navigation.navigate(AUTH_ROUTES.FICHAR)}
          color={theme.primary}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
