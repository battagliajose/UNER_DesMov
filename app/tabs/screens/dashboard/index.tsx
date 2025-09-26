
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './dashboard';
import VerIngreso from './VerIngreso';
import VerEgreso from './VerEgreso';

const Stack = createNativeStackNavigator();


export default function DashboardStack() {
  return (
    <Stack.Navigator initialRouteName="DashboardScreen">
      <Stack.Screen
        name="DashboardScreen"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerIngreso"
        component={VerIngreso}
        options={{ title: 'Ver Ingresos' }}
      />
      <Stack.Screen
        name="VerEgreso"
        component={VerEgreso}
        options={{ title: 'Ver Egresos' }}
      />
    </Stack.Navigator>
  );
}
