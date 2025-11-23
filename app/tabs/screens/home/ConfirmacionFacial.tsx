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
import { supabase } from '@shared/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { HomeStackParamList } from './index';
import * as Haptics from 'expo-haptics';

const successAnimation = require('../../../../assets/lottie/Done _ Correct _ Tick.json');
const failureAnimation = require('../../../../assets/lottie/Alert.json');

const successSound = require('../../../../assets/sounds/success-340660.mp3');
const failureSound = require('../../../../assets/sounds/failed-295059.mp3');
const warningSound = require('../../../../assets/sounds/spin-complete-295086.mp3');

type Props = NativeStackScreenProps<HomeStackParamList, 'ConfirmacionFacial'>;

export default function ConfirmacionFacial({ route, navigation }: Props) {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const { tipo, latitud, longitud } = route.params;

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

  const playSound = async (sound: 'success' | 'failure' | 'warning') => {
    const soundObject = new Audio.Sound();
    try {
      let soundFile;
      if (sound === 'success') {
        soundFile = successSound;
      } else if (sound === 'failure') {
        soundFile = failureSound;
      } else {
        soundFile = warningSound;
      }
      await soundObject.loadAsync(soundFile);
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error playing sound', error);
    }
  };

  const handleVerification = async () => {
    setIsVerifying(true);

    const { error } = await supabase.from('fichadas').insert([
      {
        tipo,
        modalidad: 'remoto',
        latitud,
        longitud,
      },
    ]);

    setIsVerifying(false);

    if (error) {
      console.error('Error inserting registro:', error);
      playSound('failure');
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      navigation.navigate('ResultadoFichada', {
        title: 'Fichaje Fallido',
        subtitle: 'No se pudo guardar tu registro. Intenta de nuevo.',
        animationUrl: failureAnimation,
      });
    } else {
      playSound('success');
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      navigation.navigate('ResultadoFichada', {
        title: '¡Fichaje Exitoso!',
        subtitle: `Tu ${tipo.toLowerCase()} ha sido registrada correctamente.`,
        animationUrl: successAnimation,
        tipo,
      });
    }
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
