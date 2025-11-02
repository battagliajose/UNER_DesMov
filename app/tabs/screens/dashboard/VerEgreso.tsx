import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { IRegistro } from '@shared/models/user';
import { MockDataService } from '@shared/models/mock-data.service';
import { colors } from '@utils/index';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@shared/lib/supabase';

export default function VerEgreso() {
  // Estado para guardar solo los registros de tipo 'egreso'
  const [egresos, setEgresos] = useState<IRegistro[]>([]);

  // useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // 1. Obtenemos el usuario con todos sus registros
    //const registrosEgresos = MockDataService.crearRegistro();

    //Supabase fetch registros
    const fetchRegistros = async (): Promise<IRegistro[]> => {
      const { data, error } = await supabase.from('fichadas').select('*');
      if (error) {
        console.error('Error fetching registros:', error);
        return [];
      }

      // Convertimos fecha string -> Date
      const registros = (data ?? []).map((r: any) => ({
        ...r,
        fecha: r.fecha ? new Date(r.fecha) : null,
      }));

      console.log('Registros fetched successfully:', data);
      return registros as IRegistro[];
    };
    const registrosDeEgreso = fetchRegistros().then((registros) => {
      registros.filter((reg) => reg.tipo === 'egreso');
      setEgresos(registros);
    });

    // 2. Filtramos para quedarnos solo con los egresos
    //const registrosDeEgreso =
    //  registrosEgresos?.filter((reg) => reg.tipo === 'egreso') || [];

    // 3. Actualizar el estado con los datos filtrados
    //setEgresos(registrosDeEgreso);
  }, []);

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
      {/* Formateamos la fecha para que sea legible */}
      <Text style={styles.itemDate}>
        {item.fecha.toLocaleDateString('es-AR')} -{' '}
        {item.fecha.toLocaleTimeString('es-AR', {
          timeZone: 'America/Argentina/Buenos_Aires',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={egresos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No hay registros de egreso.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderBlockColor: 'red',
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
