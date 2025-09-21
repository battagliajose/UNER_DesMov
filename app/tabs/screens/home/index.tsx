import Fichar from './Fichar';
import ConfirmacionFacial from './ConfirmacionFacial';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Fichar">
      <Stack.Screen
        name="Fichar"
        component={Fichar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmacionFacial"
        component={ConfirmacionFacial}
        options={{ title: 'Confirmación Facial' }}
      />
    </Stack.Navigator>
  );
}
