import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROOT_ROUTES } from '@utils/constants';
import { useContext, useEffect, useState } from 'react';
import { AUTH_ACTIONS, AuthContext } from '@shared/context/authContext';
import * as SplashScreen from 'expo-splash-screen';
import { supabase } from '@shared/lib/supabase';
import AuthStackScreen from './auth/Index';
import TabsScreen from './tabs';
import { obtenerPerfil } from '@shared/context/authContext/auth-service.ts';

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const Stack = createNativeStackNavigator();
  const { state, dispatch } = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState(false);

  // Cargar sesión persistida al iniciar
  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) console.log('Error al obtener sesión:', error.message);

      if (data.session) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN,
          payload: {
            user: data.session.user,
            token: data.session.access_token,
            refreshToken: data.session.refresh_token,
          },
        });

        try {
          await obtenerPerfil(data.session.user.id, dispatch);
        } catch (e) {
          console.log('Error cargando perfil al restaurar sesión', e);
        }
      }

      setAppIsReady(true);
    };

    loadSession();

    // Suscripción SOLO para logout
    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    });

    return () => subscription.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  const isSignedIn = !!state.user;

  return (
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
  );
}
