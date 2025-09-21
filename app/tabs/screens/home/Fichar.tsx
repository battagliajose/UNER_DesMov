import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
/*import MapView, { Marker, Circle } from 'react-native-maps';
import { materialColors } from '../../utils/colors';*/

const Fichar = () => {
  const route = useRoute();
  const handleFichada = (tipo: 'Entrada' | 'Salida') => {
    Alert.alert(
      `Confirmar ${tipo}`,
      `¿Estás seguro que querés registrar tu ${tipo.toLowerCase()}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log(`${tipo} confirmada`) },
      ],
    );
  };

  //const theme = materialColors.schemes.light;
  const workLocation = {
    latitude: -31.3833,
    longitude: -58.0,
  };

  const region = {
    ...workLocation,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  type RootStackParamList = {
    Fichar: undefined;
    ConfirmacionFacial: undefined;
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.mapWrapper}>
        <Text>Map Placeholder</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ConfirmacionFacial')}
        >
          <Text>Prueba</Text>
        </TouchableOpacity>
        <Text>Datos recibidos: {JSON.stringify(route.params)}</Text>
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
