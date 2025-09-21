import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTES } from '@utils/constants';
import Login from './Login';
import Home from '../home/Home';
import Register from './Register';
import Fichar from '../fichaje/Fichar';

export default function Auth() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={AUTH_ROUTES.LOGIN}>
      <Stack.Screen
        name={AUTH_ROUTES.HOME}
        component={Home}
        options={{
          headerRight: () => (
            <Text
              style={{ color: 'blue' }}
              onPress={() => alert('Botón de ejemplo')}>
              Info
            </Text>
          ),
          title: 'Inicio',
        }}
      />
      <Stack.Screen
        name={AUTH_ROUTES.LOGIN}
        component={Login}
        options={{
          title: 'Registro de Fichadas',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000000ff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name={AUTH_ROUTES.REGISTER}
        component={Register}
        options={{
          title: 'Registro',
        }}
      />
      <Stack.Screen
        name={AUTH_ROUTES.FICHAR}
        component={Fichar}
        options={{
          title: 'Registrar Fichada',
        }}
      />
    </Stack.Navigator>
  );
}
