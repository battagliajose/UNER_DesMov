import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import { colors, sizes } from '@utils/index';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AUTH_ROUTES } from '@utils/constants';
import { AUTH_ACTIONS, AuthContext } from '@shared/context/authContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ref } from 'yup';

type RootStackParamList = {
  Home: { email: string; pass: string };
  Register: undefined;
  Login: undefined;
};

export default function Login(): React.JSX.Element {
  const { state, dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    Alert.alert('Login', `Login iniciado!\n\nEmail: ${email}\nPass: ${pass}`, [
      { text: 'OK', onPress: () => console.log('Aceptado') },
    ]);
    //navigation.navigate(AUTH_ROUTES.HOME, { email, pass });
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: {
        toke: 'TOKEN',
        refreshToken: 'REFRESH_TOKEN',
        user: {
          id: 'ID',
          nombre: 'Nombre',
          apellido: 'Apellido',
          email: email,
        },
      },
    });

    console.log(`Login button pressed ${email} - ${pass}`);
  };

  useEffect(() => {
    if (email && pass) {
      setIsEnabled(true);
      setError(undefined);
    } else {
      setIsEnabled(false);
    }
  }, [email, pass]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenido</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-Mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={pass}
            onChangeText={setPass}
            secureTextEntry={!showPass}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <MaterialIcons
              name={showPass ? 'visibility-off' : 'visibility'}
              size={20}
              paddingTop={10}
              paddingLeft={5}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <Pressable onPress={handleLogin} disabled={!isEnabled}>
          <Text
            style={isEnabled ? styles.loginButton : styles.loginButtonDisabled}
          >
            Ingresar
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(AUTH_ROUTES.REGISTER)}>
          <Text style={{ color: colors.buttonColor, marginTop: 10 }}>
            Registrarse
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    width: '100%',
  },
  titulo: {
    fontSize: sizes.titulo,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    width: '95%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  loginButton: {
    backgroundColor: colors.buttonColor,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: 'gray',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },
});
