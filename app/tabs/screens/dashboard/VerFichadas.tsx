import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Button, ActivityIndicator, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IRegistro } from '@shared/models/user';
import { supabase } from '@shared/lib/supabase';
import generarPdfFichadas from '@utils/generarPdfFichadas';
import FichadasList from './FichadasList';

export default function VerFichadas() {
  const route = useRoute<any>();
  const { tipoFichada } = route.params || { tipoFichada: 'Entrada' }; // Default to 'Entrada' if not provided
  const [registros, setRegistros] = useState<IRegistro[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect para montar los datos
  useEffect(() => {
    //Supabase fetch registros
    const fetchRegistros = async (): Promise<IRegistro[]> => {
      setLoading(true);
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
      setLoading(false);
      setRegistros(regs);
    });
  }, [tipoFichada]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button
            title="Generar PDF"
            onPress={async () => {
              const uri = await generarPdfFichadas(registros);
              console.log('PDF final:', uri);
              if (uri) {
                Alert.alert('Listo', 'Se generó y guardó el PDF de fichadas.');
              } else {
                Alert.alert('Error', 'No se pudo generar el PDF.');
              }
            }}
          />

          {registros.length > 0 ? (
            <FichadasList registros={registros} tipoFichada={tipoFichada} />
          ) : (
            <Text>No hay fichadas</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});
