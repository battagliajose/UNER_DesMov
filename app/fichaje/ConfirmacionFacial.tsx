import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmacionFacial() {
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const cameraRef = useRef<CameraView>(null);
    const navigation = useNavigation();

    useEffect(() => {
        requestPermission();
    }, []);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Necesitamos tu permiso para usar la cámara.</Text>
                <Button onPress={requestPermission} title="Conceder permiso" />
            </View>
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
            setIsVerifying(false);
            Alert.alert('Fichaje Exitoso', 'Tu registro ha sido guardado correctamente.', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        }, 2000);
    };

    const retakePicture = () => {
        setPhoto(null);
    };

    if (isVerifying) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#65558F" />
                <Text style={styles.verifyingText}>Verificando...</Text>
            </View>
        );
    }

    return (
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
    );
}

const { width } = Dimensions.get('window');
const ovalWidth = width * 0.7;
const ovalHeight = ovalWidth * 1.3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
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
        borderRadius: ovalWidth / 2, // This creates the oval shape for the container
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
        // The oval shape is achieved by styling the container.
        // This view can be used for additional overlay graphics if needed.
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
