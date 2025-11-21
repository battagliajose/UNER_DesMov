import { IUser } from '@shared/models/user';
import * as SecureStore from 'expo-secure-store';

const STORAGE_NAME = 'Fich.Ar_';

export const STORAGE_KEYS = {
  JWT_TOKEN: 'jwtToken',
  USER: 'user',
  JWT_REFRESH_TOKEN: 'jwtRefreshToken',
  DEVICE_ID: 'deviceId',
};

const _setItem = (key: any, value: any, options?: any) =>
  SecureStore.setItemAsync(`${STORAGE_NAME}${key}`, value, options);
const _getItem = (key: string) =>
  SecureStore.getItemAsync(`${STORAGE_NAME}${key}`);
const _deleteItem = (key: string) =>
  SecureStore.deleteItemAsync(`${STORAGE_NAME}${key}`);

/*const setUser = (user: IUser) =>
  _setItem(STORAGE_KEYS.USER, JSON.stringify(user));

const getUser = async (): Promise<IUser | null> => {
  const user = await _getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

const deleteUser = () => _deleteItem(STORAGE_KEYS.USER);

export { setUser, getUser, deleteUser };*/
