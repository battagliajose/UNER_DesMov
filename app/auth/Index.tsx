import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTES } from '@utils/constants';
import { Login, Register } from './screens/index';

const Stack = createNativeStackNavigator();

export default function AuthStackScreen() {
  return (
    <Stack.Navigator initialRouteName={AUTH_ROUTES.LOGIN}>
      <Stack.Screen
        name={AUTH_ROUTES.LOGIN}
        component={Login}
        options={{
          title: 'Login',
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
