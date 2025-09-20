import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, sizes } from '../../utils';
import { useRoute } from '@react-navigation/native';

export default function Home() {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen MOCK</Text>
        {route.params && (
          <Text>Datos recibidos: {JSON.stringify(route.params)}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    width: '100%',
  },
  titulo: {
    fontSize: sizes.titulo,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: colors.buttonColor,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: 'gray',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },
});
