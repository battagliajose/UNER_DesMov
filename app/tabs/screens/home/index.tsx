import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmacionFacial from './ConfirmacionFacial';
import Fichar from './Fichar';
import ResultadoFichada from './ResultadoFichada';

export type HomeStackParamList = {
  Fichar: undefined;
  ConfirmacionFacial: {
    tipo: 'Entrada' | 'Salida';
    latitud: number;
    longitud: number;
  };
  ResultadoFichada: {
    title: string;
    subtitle: string;
    animationUrl: string;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

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
      <Stack.Screen
        name="ResultadoFichada"
        component={ResultadoFichada}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
