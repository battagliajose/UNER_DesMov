import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@utils/index';

const Acerca = () => {
  return (
    <>
      <Text style={styles.seccionTitulo}>Acerca de la App</Text>

      <TouchableOpacity style={styles.fila}>
        <View style={styles.iconBox}>
          <MaterialIcons name="info" size={24} color={colors.error} />
        </View>
        <View>
          <Text style={styles.titulo}>Versión</Text>
          <Text style={styles.subtitulo}>Conozca la versión de la app</Text>
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

export default Acerca;
