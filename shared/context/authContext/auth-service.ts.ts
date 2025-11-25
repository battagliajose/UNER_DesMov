import { supabase } from '@shared/lib/supabase';
import { AUTH_ACTIONS } from './enums';

import { IUser } from '@shared/models/user';

export const signUp = async (
  dispatch: any,
  nombre: string,
  apellido: string,
  dni: string,
  email: string,
  password: string,
) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  if (!data.session || !data.session.user) {
    throw new Error(
      'No se pudo obtener la sesión del usuario después del registro.',
    );
  }

  const nuevoPerfil: IUser = {
    id: data.session.user.id,
    nombre,
    apellido,
    dni,
    email,
  };

  if (data.session) {
    login(dispatch, data);
    await crearPerfil(nuevoPerfil);

    // Guardar el perfil en el contexto
    dispatch({
      type: AUTH_ACTIONS.SET_USER,
      payload: { profile: nuevoPerfil },
    });
  }

  return {
    user: data.user,
    session: data.session,
    needsEmailConfirmation: !data.session,
  };
};

export const signIn = async (dispatch: any, email: any, password: any) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }

  login(dispatch, data);

  const perfil = await obtenerPerfil(data.session.user.id, dispatch);

  return perfil;
};

const login = (dispatch: any, data: any) => {
  if (!data.session) return;

  dispatch({
    type: AUTH_ACTIONS.LOGIN,
    payload: {
      user: data.session.user,
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
    },
  });
};

const crearPerfil = async (perfil: IUser) => {
  const { error } = await supabase.from('perfiles').insert(perfil);

  if (error) throw error;
};

export const obtenerPerfil = async (userId: string, dispatch: any) => {
  // Cargar perfil de la tabla "perfiles"
  const { data: perfil, error: perfilError } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (perfilError) throw perfilError;

  // Guardar el perfil en el contexto
  dispatch({
    type: AUTH_ACTIONS.SET_USER,
    payload: { profile: perfil },
  });

  return perfil;
};

export const signOut = async (dispatch: any) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    if (error.name === 'AuthSessionMissingError') {
      console.log(
        'AuthSessionMissingError en signOut, se sigue igual con el logout',
      );
    } else {
      throw error;
    }
  }

  dispatch({ type: AUTH_ACTIONS.LOGOUT });
};
