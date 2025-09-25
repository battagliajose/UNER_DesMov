import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AUTH_ACTIONS, AuthContext } from '@shared/context/authContext';
import { colors } from '@utils/index';

const Acerca = () => {

const { state, dispatch } = useContext(AuthContext);

 const handleLogout = () => {
     dispatch({ type: AUTH_ACTIONS.LOGOUT });
   };
 
 
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

      <TouchableOpacity style={styles.botonCerrar} onPress={handleLogout}>
        <View style={styles.iconBox}>
          <Text style={styles.titulo}>Salir</Text>
          <MaterialIcons name="logout" size={30} color={colors.error} />
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
  },
  botonCerrar:{    
    flexDirection: 'row',    
    justifyContent: 'center',
    paddingBottom:12 ,
  }
});

export default Acerca;
