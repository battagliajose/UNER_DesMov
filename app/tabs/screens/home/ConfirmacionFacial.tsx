import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '@shared/lib/supabase';

export default function ConfirmacionFacial() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation();

  const route = useRoute();
  const { tipo } = route.params as { tipo: string };

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return <View />;
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

  const handleVerification = async () => {
    setIsVerifying(true);
    /*setTimeout(() => {
      setIsVerifying(false);
      Alert.alert(
        'Fichaje Exitoso',
        'Tu registro ha sido guardado correctamente.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    }, 2000);*/

    // Obtener la sesion, ver si se mueve al servicio
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;
    if (!session) {
      throw new Error('No hay sesión activa');
    }
    const userId = session.user.id;

    const { data, error } = await supabase.from('fichadas').insert([
      {
        userId,
        tipo,
        modalidad: 'presencial',
      },
    ]);
    if (error) {
      console.error('Error inserting registro:', error);
    } else {
      setIsVerifying(false);
      Alert.alert(
        'Fichaje Exitoso',
        'Tu registro ha sido guardado correctamente.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
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
