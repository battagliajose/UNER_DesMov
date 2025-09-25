import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerfilScreen from './perfil';
import DetalleUsuarioScreen from './DetalleUsuario';
import CambiarPasswordScreen from './CambiarPassword';

// Definimos los tipos para la prop de navegación
export type PerfilStackParamList = {
  PerfilPrincipal: undefined;
  DetalleUsuario: undefined;
  CambiarPassword: undefined;
};

const Stack = createNativeStackNavigator<PerfilStackParamList>();

const PerfilNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PerfilPrincipal" 
        component={PerfilScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="DetalleUsuario" 
        component={DetalleUsuarioScreen} 
        options={{ title: 'Detalle del Usuario' }} 
      />
      <Stack.Screen 
        name="CambiarPassword" 
        component={CambiarPasswordScreen} 
        options={{ title: 'Cambiar Contraseña' }} 
      />
    </Stack.Navigator>
  );
};

export default PerfilNavigator;