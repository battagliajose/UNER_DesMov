import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ConfirmacionFacial() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mantén tu cara en el recuadro</Text>
            {/* Placeholder for camera/face */}
            <View style={styles.facePlaceholder}>
                <Text>Cámara</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Confirmar" onPress={() => alert('Confirmado')} />
                <Button title="Repetir" onPress={() => alert('Repitiendo')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    facePlaceholder: {
        width: 300,
        height: 400,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});
