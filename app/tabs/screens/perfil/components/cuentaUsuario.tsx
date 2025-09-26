import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@utils/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PerfilStackParamList } from '../index';
import { user } from '@assets/images';

const CuentaUsuario = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PerfilStackParamList>>();

  return (
    <>
      <Text style={styles.seccionTitulo}>Cuenta</Text>

      <TouchableOpacity
        style={styles.fila}
        onPress={() => navigation.navigate('DetalleUsuario')}
      >
        <Image source={user} style={styles.avatar} />
        <View>
          <Text style={styles.titulo}>Usuario</Text>
          <Text style={styles.subtitulo}>Configure su perfil de usuario</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fila}
        onPress={() => navigation.navigate('CambiarPassword')}
      >
        <View style={styles.iconBox}>
          <MaterialIcons
            name="vpn-key"
            size={24}
            color={colors.backgroundDash}
          />
        </View>
        <View>
          <Text style={styles.titulo}>Password</Text>
          <Text style={styles.subtitulo}>Cambie su contraseña</Text>
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
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
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

export default CuentaUsuario;
