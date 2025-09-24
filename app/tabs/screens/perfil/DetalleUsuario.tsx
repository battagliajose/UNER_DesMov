import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalleUsuarioScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Detalle del Usuario</Text>
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

export default DetalleUsuarioScreen;
