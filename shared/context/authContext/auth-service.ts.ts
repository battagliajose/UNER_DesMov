import { supabase } from '@shared/lib/supabase';
import { AUTH_ACTIONS } from './enums';

import { IUser } from '@shared/models/user';

export const signUp = async (dispatch: any, email: any, password: any) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  if (data.session) {
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: {
        user: data.user,
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
      },
    });
  }
  return data;
};

export const signIn = async (dispatch: any, email: any, password: any) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }

  if (data.session) {
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: {
        user: data.user,
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
      },
    });
  }
  return data;
};

export const signOut = async (dispatch: any) => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  dispatch({ type: AUTH_ACTIONS.LOGOUT });
};

const setUser = (user: IUser) => {};

const getUser = async (): Promise<IUser | null> => {
  const user = null;
  return user ? JSON.parse(user) : null;
};
