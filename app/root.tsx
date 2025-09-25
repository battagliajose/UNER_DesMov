import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROOT_ROUTES } from '@utils/constants';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthStackScreen from './auth/Index';
import { AUTH_ACTIONS, AuthContext } from '@shared/context/authContext';
import { getUser } from '@utils/secure-store';
import * as SplashScreen from 'expo-splash-screen';
import TabsScreen from './tabs';

export default function Root() {
  const Stack = createNativeStackNavigator();
  const { state, dispatch } = useContext(AuthContext);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    if (state?.user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [state]);

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: { user },
        });
        setIsSignedIn(true);
      }
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={isSignedIn ? ROOT_ROUTES.TABS : ROOT_ROUTES.AUTH}
      >
        {isSignedIn ? (
          <Stack.Screen
            name={ROOT_ROUTES.TABS}
            component={TabsScreen}
            options={{
              title: 'Control de Fichadas',
            }}
          />
        ) : (
          <Stack.Screen
            name={ROOT_ROUTES.AUTH}
            component={AuthStackScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
}
