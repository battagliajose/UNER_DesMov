import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { colors } from '@utils/index';
import MapView, { Marker, Circle } from 'react-native-maps';
import { materialColors } from '@utils/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from './index';
// Para el permiso de GPS y obtener la ubicacion
import * as GPS from '@utils/gps';
import WeatherInfo from './WeatherInfo';

const Fichar = () => {
  type Coordenadas = {
    latitude: number;
    longitude: number;
  };

  const mapRef = useRef<MapView | null>(null);

  const [ubicacion, setUbicacion] = useState<Coordenadas>({
    latitude: -31.3833,
    longitude: -58.0,
  });

  useEffect(() => {
    const obtenerPermisoYUbicacion = async () => {
      await GPS.obtenerPermiso();
      const pos = await GPS.obtenerUbicacion();
      setUbicacion({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    };

    obtenerPermisoYUbicacion();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const nuevaRegion = {
      ...ubicacion,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current.animateToRegion(nuevaRegion, 1000);
  }, [ubicacion]);

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleFichada = (tipo: 'Entrada' | 'Salida') => {
    Alert.alert(
      `Confirmar ${tipo}`,
      `¿Estás seguro que querés registrar tu ${tipo.toLowerCase()}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () =>
            navigation.navigate('ConfirmacionFacial', {
              tipo: tipo,
              latitud: ubicacion.latitude,
              longitud: ubicacion.longitude,
            }),
        },
      ],
    );
  };

  const theme = materialColors.schemes.light;
  const workLocation = {
    latitude: -31.3833,
    longitude: -58.0,
  };

  const region = {
    ...ubicacion,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          followsUserLocation={true}
          showsUserLocation={true}
        >
          <Marker
            coordinate={workLocation}
            title="UNER"
            description="Facultad de Ciencias de la Administración"
          />
          <Circle
            center={workLocation}
            radius={200}
            fillColor="rgba(101, 85, 143, 0.3)"
            strokeColor={theme.primary}
          />
        </MapView>
      </View>
      <WeatherInfo latitude={ubicacion.latitude} longitude={ubicacion.longitude} />
      <View style={styles.buttonContainer}>
        {/*Boton para fichar la entrada*/}
        <Pressable
          style={[styles.boton, { backgroundColor: colors.backgroundDash }]}
          onPress={() => handleFichada('Entrada')}
        >
          <Text style={styles.text}>Entrada</Text>
        </Pressable>

        {/*Boton para fichar la salida*/}
        <Pressable
          style={[styles.boton, { backgroundColor: colors.buttonColor }]}
          onPress={() => handleFichada('Salida')}
        >
          <Text style={styles.text}>Salida</Text>
        </Pressable>
      </View>
    </View>
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
  boton: {
    borderRadius: 12,
  },
  text: {
    padding: 10,
    fontSize: 18,
    color: 'white',
    width: 150,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Fichar;
