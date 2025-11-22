import {
  requestForegroundPermissionsAsync,
  hasServicesEnabledAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { Alert } from 'react-native';

const obtenerPermiso = async () => {
  let { status, canAskAgain } = await requestForegroundPermissionsAsync();
  console.log('Estado del permiso de ubicación:', status);

  if (status !== 'granted') {
    if (!canAskAgain) {
      Alert.alert(
        'Permiso de ubicación denegado',
        'La funcionalidad de fichar requiere de este permiso, por favor habilite en configuración.',
        [
          {
            text: 'Ok',
            onPress: () => {
              return false;
            },
          },
        ],
      );
    }

    Alert.alert(
      'Permiso de ubicación denegado',
      'La funcionalidad de fichar requiere de este permiso.',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            console.log('Cancelado');
            return false;
          },
        },
        {
          text: 'Ok',
          onPress: () => {
            obtenerPermiso();
          },
        },
      ],
    );
  }

  const isLocationServiceEnabled = await hasServicesEnabledAsync(); //Verifica que esté encendido el GPS

  if (!isLocationServiceEnabled) {
    Alert.alert(
      'Ubicación desactivada',
      'Para usar la app necesitás activar el GPS/servicios de ubicación.',
    );
  }

  return true;
};

const obtenerUbicacion = async () => {
  const ubicacion = await getCurrentPositionAsync({});
  return ubicacion;
};

export { obtenerPermiso, obtenerUbicacion };
