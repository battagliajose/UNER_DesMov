import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { obtenerDireccion } from '@utils/gps';
import { colors } from '@utils/index';
import { Ionicons } from '@expo/vector-icons';

interface LocationAddressProps {
  latitude: number;
  longitude: number;
}

const LocationAddress: React.FC<LocationAddressProps> = ({ latitude, longitude }) => {
  const [address, setAddress] = useState<string>('Cargando dirección...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAddress = async () => {
      // Pequeña validación por si las coordenadas son 0 o inválidas
      if (!latitude || !longitude) {
        if (isMounted) {
            setAddress('Coordenadas no disponibles');
            setLoading(false);
        }
        return;
      }

      const dir = await obtenerDireccion(latitude, longitude);
      if (isMounted) {
        setAddress(dir || 'Ubicación desconocida');
        setLoading(false);
      }
    };

    fetchAddress();

    return () => { isMounted = false; };
  }, [latitude, longitude]);

  if (loading) {
    return (
        <View style={styles.row}>
            <ActivityIndicator size="small" color={colors.backgroundDash} />
            <Text style={styles.loadingText}> Buscando dirección...</Text>
        </View>
    );
  }

  return (
    <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color={colors.backgroundDash} />
        <Text style={styles.addressText}> {address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#555',
        flex: 1, // Para que el texto haga wrap si es muy largo
    },
    loadingText: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    }
});

export default LocationAddress;
