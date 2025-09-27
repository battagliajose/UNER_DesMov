import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@utils/index';
import { PerfilStackParamList } from '../index';

const Preferencias = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PerfilStackParamList>>();

  return (
    <>
      <Text style={styles.seccionTitulo}>Preferencias</Text>

      <TouchableOpacity
        style={styles.fila}
        onPress={() => navigation.navigate('TemasPreferencias')}
      >
        <View style={styles.iconBox}>
          <MaterialIcons
            name="wb-sunny"
            size={24}
            color={colors.backgroundDash}
          />
        </View>
        <View>
          <Text style={styles.titulo}>Temas</Text>
          <Text style={styles.subtitulo}>
            Personaliza la apariencia de la app
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fila}
        onPress={() => navigation.navigate('Notificaciones')}
      >
        <View style={styles.iconBox}>
          <MaterialIcons
            name="notifications"
            size={24}
            color={colors.backgroundDash}
          />
        </View>
        <View>
          <Text style={styles.titulo}>Notificaciones</Text>
          <Text style={styles.subtitulo}>
            Administra la configuración de notificaciones
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  seccionTitulo: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.outline,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 72,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.outline,
  },
  subtitulo: {
    fontSize: 14,
    color: colors.outline,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f0f3f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Preferencias;
