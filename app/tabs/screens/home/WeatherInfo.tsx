import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { colors } from '@utils/index';
import { Ionicons } from '@expo/vector-icons';
import { getWeatherDescription } from '@utils/weatherCodes';

interface WeatherInfoProps {
  latitude: number;
  longitude: number;
}

interface WeatherData {
  temp_c: number;
  wx_desc: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        
        // OpenMeteo
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;        
       
        const response = await axios.get(url);
        const current = response.data.current;
        
        setWeather({
            //del objeto le paso el valor de la propiedad temp 
          temp_c: current.temperature_2m,
          // del objeto le paso el valor del codigo del weather.
          //le paso el codigo del tiempo a la funcion (utils/weatherCodes)
          wx_desc: getWeatherDescription(current.weather_code),
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('No se pudo cargar el clima');
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={colors.backgroundDash} />
        <Text style={styles.text}>Cargando clima...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Ionicons name="cloud-offline-outline" size={24} color="gray" />
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  if (!weather) return null;

  return (
    <View style={styles.container}>
      <View style={styles.weatherRow}>
        <Ionicons name="thermometer-outline" size={24} color={colors.backgroundDash} />
        <Text style={styles.temp}>{weather.temp_c}°C</Text>
      </View>
      <View style={styles.weatherRow}>
        <Ionicons name="partly-sunny-outline" size={24} color={colors.backgroundDash} />
        <Text style={styles.desc}>{weather.wx_desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  temp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  desc: {
    fontSize: 16,
    color: '#555',
    textTransform: 'capitalize',
  },
});

export default WeatherInfo;
