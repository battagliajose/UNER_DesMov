import * as Notifications from 'expo-notifications';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { HomeStackParamList } from './index';

type Props = NativeStackScreenProps<HomeStackParamList, 'ResultadoFichada'>;

export default function ResultadoFichada({ route, navigation }: Props) {
  // params para route
  const { title, subtitle, animationUrl, tipo } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.popToTop();
    }, 3000); //tiempo de espera de la animación que confirma el fichaje,
    // aguarda 3 segundos para que la misma se complete

    if (tipo === 'Entrada') {
      // Notificación solo si fue ingreso
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio de salida',
          body: 'Tu horario laboral está por terminar! No olvides fichar tu salida.',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 20, // dispara la notificación en 20 segundos
          repeats: false,
        },
        // solo los 20 seg para la demo de funcionamiento, en un contexto
        // productivo esto se lanza cuando se acerca el horario real
        // de salida del usuario, 10 minutos antes por ejemplo
      });
    }
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <LottieView
          source={animationUrl}
          autoPlay
          loop={false}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 40,
    textAlign: 'center',
  },
});
