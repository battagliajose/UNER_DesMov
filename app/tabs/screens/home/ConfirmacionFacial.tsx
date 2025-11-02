import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackParamList } from './index';

// Animation URLs
const successAnimation =
  'https://assets4.lottiefiles.com/packages/lf20_obhph3sh.json';
const failureAnimation =
  'https://assets3.lottiefiles.com/packages/lf20_e1pmabgl.json';
const warningAnimation =
  'https://assets10.lottiefiles.com/packages/lf20_21xquqee.json';

type Props = NativeStackScreenProps<HomeStackParamList, 'ConfirmacionFacial'>;

export default function ConfirmacionFacial({ route, navigation }: Props) {
  const { tipo } = route.params;

  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color="#65558F" />
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>
            Necesitamos tu permiso para usar la cámara.
          </Text>
          <Button onPress={requestPermission} title="Conceder permiso" />
        </View>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData?.uri || null);
    }
  };

  const handleVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      if (tipo === 'Salida') {
        const random = Math.random();
        if (random < 0.5) {
          // Salida temprano
          navigation.navigate('ResultadoFichada', {
            title: 'Salida Registrada',
            subtitle: 'Saliste antes de que termine tu horario.',
            animationUrl: warningAnimation,
          });
        } else {
          // Salida tarde
          navigation.navigate('ResultadoFichada', {
            title: 'Salida Registrada',
            subtitle: 'Saliste fuera de tu horario laboral.',
            animationUrl: warningAnimation,
          });
        }
      } else {
        // Entrada
        const exito = Math.random() < 0.8; // 80% chance of success for mock
        navigation.navigate('ResultadoFichada', {
          title: exito ? '¡Fichaje Exitoso!' : 'Fichaje Fallido',
          subtitle: exito ? 'Llegaste a tiempo.' : 'Llegaste tarde.',
          animationUrl: exito ? successAnimation : failureAnimation,
        });
      }
    }, 2000);
  };

  const retakePicture = () => {
    setPhoto(null);
  };

  if (isVerifying) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color="#65558F" />
          <Text style={styles.verifyingText}>Verificando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {photo ? '¿Usar esta foto?' : 'Centrá tu rostro en el óvalo'}
        </Text>
        <View style={styles.cameraContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.camera} />
          ) : (
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
              <View style={styles.overlay} />
            </CameraView>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {photo ? (
            <>
              <Button title="Usar Foto" onPress={handleVerification} />
              <Button title="Repetir" onPress={retakePicture} color="#E05D5D" />
            </>
          ) : (
            <Button title="Fichar" onPress={takePicture} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const ovalWidth = width * 0.7;
const ovalHeight = ovalWidth * 1.3;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  centerContent: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  cameraContainer: {
    width: ovalWidth,
    height: ovalHeight,
    borderRadius: ovalWidth / 2,
    overflow: 'hidden',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#65558F',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  verifyingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#65558F',
  },
});