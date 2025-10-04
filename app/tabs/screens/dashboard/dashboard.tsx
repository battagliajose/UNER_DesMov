import React, { useEffect,useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { colors } from '@utils/index';
import { Ionicons } from '@expo/vector-icons';
import Animated, {useAnimatedStyle, useSharedValue,withTiming} from 'react-native-reanimated'

// Definimos los tipos para la prop de navegación
type DashboardScreenNavigationProp = {
  navigate: (screen: string) => void;
};

export default function Dashboard() {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

 //Opacidades separadas de los cuadros de Info
  const op1 = useSharedValue(0);
  const op2 = useSharedValue(0);
  const op3 = useSharedValue(0);

  //Botones
  const ingresoActivo = useSharedValue(0);
  const egresoActivo = useSharedValue(0); 

  // Creo los estilos y le paso el valor de las variables op
  const animatedStyleHoras = useAnimatedStyle(() => ({ opacity: op1.value }));
  const animatedStyleDias = useAnimatedStyle(() => ({ opacity: op2.value }));
  const animatedStylePromedio = useAnimatedStyle(() => ({ opacity: op3.value }));

  //background Ingreso
  const animatedStyleIngreso=useAnimatedStyle(()=>({
    backgroundColor:withTiming(
      ingresoActivo.value ? colors.backgroundDash : 'white',
      {duration:300}
    )
  }))

  //background Engreso
  const animatedStyleEgreso=useAnimatedStyle(()=>({
    backgroundColor:withTiming(
      egresoActivo.value ? colors.backgroundDash : 'white',
      {duration:300}
    )
  }))

  //color Ingreso
  const animatedStyleIngresoText=useAnimatedStyle(()=>({
    color:withTiming(ingresoActivo.value ? 'white' : colors.backgroundDash,{duration:400})
  }))
  //color Egreso
  const animatedStyleEgresoText=useAnimatedStyle(()=>({
    color:withTiming(egresoActivo.value ? 'white' :colors.backgroundDash,{duration:400})
  }))

  useFocusEffect(
    useCallback(() => {   
      op1.value=0;
      op2.value=0;
      op3.value=0;
      ingresoActivo.value=0;
      egresoActivo.value=0
      setTimeout(()=>{
        op1.value = withTiming(1, { duration: 800 });
      },100);         
      setTimeout(() => {
        op2.value = withTiming(1, { duration: 800 });
      }, 800);
      setTimeout(() => {
        op3.value = withTiming(1, { duration: 800 });
      }, 1600);
      
    }, [])

    
    

  );
  return (
    <View style={styles.container}>
      {/* Primera Fila: Dos Columnas */}
      <View style={styles.row}>
        <Animated.View style={[styles.column, styles.cols, animatedStyleHoras]}>
          <Ionicons name="time-outline" size={32} color="white" />

          <Text style={styles.text}>Total de Horas</Text>
          <Text style={styles.textNumero}>10</Text>
        </Animated.View>
        <Animated.View style={[styles.column, styles.cols,animatedStyleDias]}>
          <Ionicons name="calendar" size={32} color="white" />
          <Text style={styles.text}>Dias Trabajados</Text>
          <Text style={styles.textNumero}>5</Text>
        </Animated.View>
      </View>

      {/* Segunda Fila: Una Columna */}
      <Animated.View style={[styles.row, styles.row2,animatedStylePromedio]}>
        {/*chart-bell-curve-cumulative*/}
        <Ionicons name="analytics" size={32} color='white'/>
        <Text style={styles.text}>Hora Promedio de Ingreso </Text>
        <Text style={styles.text}>09:00</Text>
      </Animated.View>

      {/* Tercera Fila: Una Columna */}
      <View style={[styles.row, styles.row3]}>
        <AnimatedTouchableOpacity
          style={[styles.button,animatedStyleIngreso]}
          onPress={() => {
            ingresoActivo.value=1;
            egresoActivo.value=0;
            navigation.navigate('VerIngreso')}}
        >       
        <Animated.Text style={[styles.textboton, animatedStyleIngresoText]}>
          Ver Ingresos
        </Animated.Text>
      
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity
          style={[styles.button, animatedStyleEgreso]}
          onPress={() => {
            ingresoActivo.value=0;
            egresoActivo.value=1;
            navigation.navigate('VerEgreso')}}
        >
        
        <Animated.Text style={[styles.textboton, animatedStyleEgresoText]}>
          Ver Egresos
        </Animated.Text>
        
        </AnimatedTouchableOpacity>
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
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cols: {
    backgroundColor: colors.backgroundDash,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 24,
  },

  row2: {
    borderRadius: 12,
    borderTopRightRadius: 20,
    backgroundColor: colors.backgroundDash,
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
    borderColor: colors.buttonColor,
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  textboton: {
    color: colors.backgroundDash,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textNumero: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    width:'100%',
    textAlign:'center'
  },
});
