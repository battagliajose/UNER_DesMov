import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Fichar from './app/fichaje/Fichar';
import ConfirmacionFacial from './app/fichaje/ConfirmacionFacial';

export type RootStackParamList = {
  Fichar: undefined;
  ConfirmacionFacial: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Fichar">
          <Stack.Screen name="Fichar" component={Fichar} />
          <Stack.Screen name="ConfirmacionFacial" component={ConfirmacionFacial} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}