
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './dashboard';
import VerFichadas from './VerFichadas';

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
        name="VerFichadas"
        component={VerFichadas}
        options={{ title: 'Fichadas' }}
      />
    </Stack.Navigator>
  );
}
