import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IRegistro } from '@shared/models/user';
import { colors } from '@utils/index';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@shared/lib/supabase';
import generarPdfFichadas from '@utils/generarPdfFichadas';

const handleExportarPdf = async (fichadas: IRegistro[]) => {
  const uriLocal = await generarPdfFichadas(fichadas);

  if (uriLocal) {
    Alert.alert('Listo', 'Se generó y guardó el PDF de fichadas.');
  } else {
    Alert.alert('Error', 'No se pudo generar el PDF.');
  }
};

export default function VerFichadas() {
  const route = useRoute<any>();
  const { tipoFichada } = route.params || { tipoFichada: 'Entrada' }; // Default to 'Entrada' if not provided
  const [registros, setRegistros] = useState<IRegistro[]>([]);

  // useEffect para montar los datos
  useEffect(() => {
    //Supabase fetch registros
    const fetchRegistros = async (): Promise<IRegistro[]> => {
      const { data, error } = await supabase
        .from('fichadas')
        .select('*')
        .filter('tipo', 'eq', tipoFichada)
        .order('fecha', { ascending: false });
      if (error) {
        console.error('Error fetching registros:', error);
        return [];
      }

      // Convertimos fecha string -> Date
      const regs = (data ?? []).map((r: any) => ({
        ...r,
        fecha: r.fecha ? new Date(r.fecha) : null,
      }));

      return regs as IRegistro[];
    };

    fetchRegistros().then((regs) => {
      setRegistros(regs);
    });
  }, [tipoFichada]);

  // Componente para renderizar cada item de la lista
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
        )}{' '}
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
      <Text>{item.latitud}</Text>
      <Text>{item.longitud}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Generar PDF"
        onPress={async () => {
          const uri = await generarPdfFichadas(registros);
          console.log('PDF final:', uri);
        }}
      />

      <FlatList
        data={registros}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text>No hay registros de {tipoFichada.toLowerCase()}.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
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
});
