import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { HomeStackParamList } from './index';

type Props = NativeStackScreenProps<HomeStackParamList, 'ResultadoFichada'>;

export default function ResultadoFichada({ route, navigation }: Props) {
  // Get generic params from route
  const { title, subtitle, animationUrl } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.popToTop();
    }, 3000); // Increased to 3 seconds for better readability of messages

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
