import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROOT_ROUTES } from '@utils/constants';
import { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthStackScreen from './auth/Index';
import { AUTH_ACTIONS, AuthContext } from '@shared/context/authContext';
import { getUser } from '@utils/secure-store';
import * as SplashScreen from 'expo-splash-screen';
import TabsScreen from './tabs';
import { supabase } from '@shared/lib/supabase';
import { user } from '@assets/images';

export default function Root() {
  const Stack = createNativeStackNavigator();
  const { state, dispatch } = useContext(AuthContext);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    // 1) Chequeo inicial
    (async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error) {
        console.log('Error de autenticación:', error.message);
      }

      if (session) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN,
          payload: {
            user: session.user,
            token: session.access_token,
            refreshToken: session.refresh_token,
          },
        });
        setIsSignedIn(true);
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        setIsSignedIn(false);
      }
      await SplashScreen.hideAsync();
    })();

    // 2) Suscripción a cambios
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
        case 'USER_UPDATED':
          if (session) {
            dispatch({
              type: AUTH_ACTIONS.LOGIN,
              payload: {
                user: session.user,
                token: session.access_token,
                refreshToken: session.refresh_token,
              },
            });
            setIsSignedIn(true);
          }
          break;
        case 'SIGNED_OUT':
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
          setIsSignedIn(false);
          break;
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
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
