import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, ActivityIndicator } from 'react-native';
import { IRegistro } from '@shared/models/user';
import { colors } from '@utils/index';
import { Ionicons } from '@expo/vector-icons';
import MostrarDireccion from './MostrarDireccion';
import { supabase } from '@shared/lib/supabase';
import * as Linking from 'expo-linking';

interface FichadasListProps {
  registros: IRegistro[];
  tipoFichada: string;
}

const FichadaItem = ({ item }: { item: IRegistro }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item.foto) {
      fetchImage(item.foto);
    }
  }, [item.foto]);

  const fetchImage = async (path: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
      .from('fichadas')
      .createSignedUrl(path, 60);

      if (error) {
        console.log('Error creando signed url:', error);
        return;
      }

      if (data?.signedUrl) {
        setImageUrl(data.signedUrl);
      }
    } catch (err) {
      console.log('Error fetching image:', err);
    } finally {
      setLoading(false);
    }
  };

  const habilitado = !loading && !!item.foto;

  const handleOnClickFoto = () => {
    if (imageUrl) {
      Linking.openURL(imageUrl);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemText}>{item.tipo}</Text>

        <Text style={styles.itemDate}>
          {item.modalidad === 'presencial' ? (
            <Ionicons
              name="home-outline"
              size={24}
              color={colors.backgroundDash}
            />
          ) : (
            <Ionicons
              name="laptop-outline"
              size={24}
              color={colors.backgroundDash}
            />
          )}
          {' -> '}
          {item.modalidad}
        </Text>
        {/* Formateo la fecha para que sea legible */}
        <Text style={styles.itemDate}>
          {item.fecha.toLocaleDateString('es-AR')} -{' '}
          {item.fecha.toLocaleTimeString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>

        {item.latitud && item.longitud ? (
          <MostrarDireccion latitude={item.latitud} longitude={item.longitud} />
        ) : (
          <Text style={styles.itemDate}>Ubicación no disponible</Text>
        )}
      </View>

      <View style={styles.rightContainer}>
        {loading ? (
          <View style={styles.imagePlaceholder}>
            <ActivityIndicator size="small" color={colors.backgroundDash} />
          </View>
        ) : imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : null}
        <Pressable
          style={[styles.button, !habilitado && styles.buttonDisabled]}
          disabled={!habilitado}
          onPress={() => handleOnClickFoto()}
        >
          <Text style={styles.buttonText}>Ver Foto</Text>
        </Pressable>
      </View>
    </View>
  );
};

const FichadasList: React.FC<FichadasListProps> = ({
  registros,
  tipoFichada,
}) => {
  return (
    <FlatList
      data={registros}
      renderItem={({ item }) => <FichadaItem item={item} />}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          No hay registros de {tipoFichada.toLowerCase()}.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: colors.backgroundDash,
    borderWidth: 2,
    borderStyle: 'solid',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  itemText: {
    color: colors.outline,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  itemDate: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 10,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  button: {
    backgroundColor: colors.backgroundDash,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default FichadasList;
