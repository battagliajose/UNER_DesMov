import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTES } from './utils/constants';
import Login from './app/auth/Login';
import Home from './app/home/Home';
import Register from './app/auth/Register';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AUTH_ROUTES.LOGIN}>
          <Stack.Screen name={AUTH_ROUTES.HOME} component={Home}
                              options = {{
                                  headerRight: () => (
                                    <Text style={{color: 'blue'}} onPress={() => alert('Botón de ejemplo')}>Info</Text>
                                  ),
                                  title: 'Inicio',
                                }}
           />
          <Stack.Screen name={AUTH_ROUTES.LOGIN} component={Login}
                              options = {{
                                  title: 'Bienvenido',
                                  headerStyle: {
                                    backgroundColor: '#f4511e',
                                  },
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {
                                    fontWeight: 'bold',
                                  },
                                }}
           />
          <Stack.Screen name={AUTH_ROUTES.REGISTER} component={Register} 
                                options = {{
                                  title: 'Registro',
                                }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
