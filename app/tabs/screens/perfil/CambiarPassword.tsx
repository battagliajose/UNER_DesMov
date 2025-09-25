import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CambiarPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Cambiar Contraseña</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CambiarPasswordScreen;
