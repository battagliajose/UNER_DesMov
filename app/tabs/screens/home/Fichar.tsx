import React from 'react';
import { View, Button,Text,Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {colors} from '@utils/index'
import MapView, { Marker, Circle } from 'react-native-maps';
import { materialColors } from '../../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Fichar = () => {
  type RootStackParamList = {
    ConfirmacionFacial: undefined;
    Fichar: undefined;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFichada = (tipo: 'Entrada' | 'Salida') => {
    Alert.alert(
      `Confirmar ${tipo}`,
      `¿Estás seguro que querés registrar tu ${tipo.toLowerCase()}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => navigation.navigate('ConfirmacionFacial'),
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
    ...workLocation,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.mapWrapper}>
        <MapView style={styles.map} initialRegion={region}>
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
      <View style={styles.buttonContainer}>

        {/*Boton para fichar la entrada*/ }
       <Pressable
          style={[styles.boton ,{ backgroundColor: colors.backgroundDash }]}
          onPress={() => handleFichada('Entrada')}
        >
          <Text style={styles.text}>Entrada</Text>
        </Pressable>

        {/*Boton para fichar la salida*/}
           <Pressable
          style={[styles.boton ,{ backgroundColor: colors.buttonColor }]}
          onPress={() => handleFichada('Salida')}
        >
          <Text style={styles.text}>Salida</Text>
        </Pressable>



        
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
  boton:{
    borderRadius:12,

  },
  text:{
    padding:10,
    fontSize:18,
    color:'white',
    width:150,
    //alinear text 
    textAlign:'center',
    fontWeight:'bold',
  }
});

export default Fichar;
