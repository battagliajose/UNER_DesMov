import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { IRegistro } from '@shared/models/user';
import { colors } from '@utils/index';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@shared/lib/supabase';

export default function VerIngreso() {
  // Estado para guardar solo los registros de tipo 'ingreso'
  const [ingresos, setIngresos] = useState<IRegistro[]>([]);

  // useEffect para montar los datos
  useEffect(() => {
    // injecto el servidor
    //const registrosIngreso = MockDataService.crearRegistro();

    //Supabase fetch registros
    const fetchRegistros = async (): Promise<IRegistro[]> => {
      const { data, error } = await supabase
        .from('fichadas')
        .select('*')
        .filter('tipo', 'eq', 'Entrada')
        .order('fecha', { ascending: false });
      if (error) {
        console.error('Error fetching registros:', error);
        return [];
      }

      // Convertimos fecha string -> Date
      const registros = (data ?? []).map((r: any) => ({
        ...r,
        fecha: r.fecha ? new Date(r.fecha) : null,
      }));

      return registros as IRegistro[];
    };

    fetchRegistros().then((registros) => {
      /*
      const ingresosFiltrados = registros.filter(
        (reg) => reg.tipo === 'Entrada',
      );*/
      setIngresos(registros);
    });

    // 2. Filtrar para quedarnos solo con los ingresos
    //const registrosDeIngreso =
    //  registrosIngreso?.filter((reg) => reg.tipo === 'ingreso') || [];

    // 3. Actualizar el estado con los datos filtrados
    //setIngresos(registrosDeIngreso);
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
      <FlatList
        data={ingresos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No hay registros de ingreso.</Text>}
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
