import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors} from '@utils/index';

// Definimos los tipos para la prop de navegación
type DashboardScreenNavigationProp = {
  navigate: (screen: string) => void;
};

export default function Dashboard() {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Primera Fila: Dos Columnas */}
      <View style={styles.row}>
        <View style={[styles.column, styles.cols]}>
          <Text style={styles.text}>Total de Horas</Text>
          <Text style={styles.text}>8</Text>
        </View>
        <View style={[styles.column, styles.cols]}>
          <Text style={styles.text}>Dias Trabajados</Text>
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      {/* Segunda Fila: Una Columna */}
      <View style={[styles.row, styles.row2]}>
        <Text style={styles.text}>Hora Prmedio de Ingreso </Text>
        <Text style={styles.text}>09:00</Text>
      </View>

      {/* Tercera Fila: Una Columna */}
      <View style={[styles.row, styles.row3]}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerIngreso')} >
            <Text style={styles.textboton}>Ver Ingresos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerEgreso')} >
            <Text style={styles.textboton}>Ver Egresos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',    
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 12,
    backgroundColor: colors.error,
    
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
 
  cols: {
    backgroundColor: colors.error,
    //borderColor: colors.error,
    //borderWidth: 2,
    //borderStyle: 'solid',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 24,          
  },
  
  row2: {
    //borderColor: colors.error,
    //borderWidth: 2,
    //borderStyle: 'solid',
    borderRadius: 12,
    borderTopRightRadius: 20,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,    
    flex: 1,
    flexDirection: 'column',
    
  },
  row3: {      
    justifyContent: 'flex-start',      
    margin: 4,  
    gap: 10,
    padding: 10,
    flexDirection: 'column',
     
  },
  button: {
    borderColor: colors.error,
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    height: 50,    
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,    
  },
  textboton: {
    color: colors.error,
    fontSize: 18,
    fontWeight: 'bold',
  
  }
});