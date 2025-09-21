
import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Circle } from 'react-native-maps';
import { materialColors } from '../../utils/colors';

const Fichar = () => {
  const handleFichada = (tipo: 'Entrada' | 'Salida') => {
    Alert.alert(
      `Confirmar ${tipo}`,
      `¿Estás seguro que querés registrar tu ${tipo.toLowerCase()}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log(`${tipo} confirmada`) },
      ]
    );
  };

  const theme = materialColors.schemes.light;
  const workLocation = {
    latitude: -31.3833,
    longitude: -58.0000,
  };

  const region = {
    ...workLocation,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.mapWrapper}>
        <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={workLocation} title="UNER" description="Facultad de Ciencias de la Administración" />
          <Circle center={workLocation} radius={200} fillColor="rgba(101, 85, 143, 0.3)" strokeColor={theme.primary} />
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Entrada" onPress={() => handleFichada('Entrada')} color={theme.primary} />
        <Button title="Salida" onPress={() => handleFichada('Salida')} color={theme.tertiary} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapWrapper: {
    flex: 3,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Fichar;
