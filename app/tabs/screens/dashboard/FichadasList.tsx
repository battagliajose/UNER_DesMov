import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { IRegistro } from '@shared/models/user';
import { colors } from '@utils/index';
import { Ionicons } from '@expo/vector-icons';
import MostrarDireccion from './MostrarDireccion';

interface FichadasListProps {
  registros: IRegistro[];
  tipoFichada: string;
}

const FichadasList: React.FC<FichadasListProps> = ({ registros, tipoFichada }) => {
    //destructuo el objeto registros
  const renderItem = ({ item }: { item: IRegistro }) => (
    <View style={styles.itemContainer}>
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
        )}{' -> '}
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
  );

  return (
    <FlatList
      data={registros}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No hay registros de {tipoFichada.toLowerCase()}.</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
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
});

export default FichadasList;
