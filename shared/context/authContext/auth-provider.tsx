import { useReducer } from 'react';
import AuthContext from './auth-context';
import { IUser } from '@shared/models/user';
import { AUTH_ACTIONS } from './enums';

interface Action {
  type: AUTH_ACTIONS;
  payload?: any;
}

interface State {
  isLoading: boolean;
  token: string | null;
  user: IUser | any;
  profile: IUser | null;
  refreshToken: string | null;
}

const initialState = {
  isLoading: false,
  token: null,
  user: null,
  profile: null,
  refreshToken: null,
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer((prevState: State, action: Action) => {
    const { payload } = action;
    switch (action.type) {
      case AUTH_ACTIONS.LOGIN:
        return {
          ...prevState,
          user: payload.user,
          token: payload.token,
          refreshToken: payload.refreshToken,
        };
      case AUTH_ACTIONS.LOGOUT:
        return initialState;
      case AUTH_ACTIONS.SET_USER:
        return {
          ...prevState,
          profile: payload.profile,
        };
      default:
        return prevState;
    }
  }, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
