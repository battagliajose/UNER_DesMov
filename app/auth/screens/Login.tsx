import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import { colors, sizes } from '@utils/index';
import { Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AUTH_ROUTES } from '@utils/constants';
import { AUTH_ACTIONS, AuthContext } from '@shared/context/authContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RootStackParamList = {
  Home: { email: string; pass: string };
  Register: undefined;
  Login: undefined;
};

export default function Login() {
  const { state, dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [touchedMail, setTouchedMail] = useState<boolean>(false);
  const [touchedPass, setTouchedPass] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    Alert.alert('Login', `Login iniciado!\n\nEmail: ${email}\nPass: ${pass}`, [
      { text: 'OK', onPress: () => console.log('Aceptado') },
    ]);
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: {
        token: 'TOKEN',
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

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    if (email && pass) {
      if (!validateEmail(email)) {
        setError('Formato de email inválido');
        setIsEnabled(false);
      } else {
        setError(undefined);
        setIsEnabled(true);
      }
    } else if (touchedMail && touchedPass) {
      setError('Debe completar todos los campos');
      setIsEnabled(false);
    }
  }, [email, pass]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        source={require('../../../assets/images/back_login.png')} // tu imagen en assets
        style={styles.background}
        resizeMode="cover" // cover, contain o stretch
      >
        <View style={styles.container}>
          <Text style={styles.titulo}>Bienvenido</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-Mail"
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouchedMail(true)}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={pass}
              onChangeText={setPass}
              onBlur={() => setTouchedPass(true)}
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
              style={
                isEnabled ? styles.loginButton : styles.loginButtonDisabled
              }
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
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
