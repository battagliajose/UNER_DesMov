import React, { useContext, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Pressable,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, sizes } from '@utils/index';
import { Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AUTH_ROUTES } from '@utils/constants';
import { AuthContext } from '@shared/context/authContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { signIn } from '@shared/context/authContext/auth-service.ts';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MainView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BackImage = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TextTitulo = styled.Text`
  font-size: ${sizes.titulo}px;
  font-weight: bold;
  color: black;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

const InputLogin = styled.TextInput`
  background-color: white;
  width: 95%;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-top: 10px;
  padding-horizontal: 10px;
  border-radius: 5px;
`;

const LoginButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ disabled }) =>
    disabled ? 'gray' : colors.buttonColor};
  color: white;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
  margin-top: 10px;
  text-align: center;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
`;

const ErrorText = styled.Text`
  color: red;
`;

const RegisterButton = styled.Text`
  color: ${colors.buttonColor};
  margin-top: 10px;
`;

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

  const handleLogin = async () => {
    try {
      const perfil = await signIn(dispatch, email, pass);
    } catch (err: any) {
      Alert.alert('Error de Login: ', err.message);
    }

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <MainView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <BackImage
          source={require('../../../assets/images/back_login.png')}
          resizeMode="cover"
        >
          <Container>
            <TextTitulo>Bienvenido</TextTitulo>
            <InputContainer>
              <InputLogin
                placeholder="E-Mail"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onBlur={() => setTouchedMail(true)}
                keyboardType="email-address"
              />
            </InputContainer>
            <InputContainer>
              <InputLogin
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
            </InputContainer>
            {error && <ErrorText>{error}</ErrorText>}
            <LoginButton onPress={handleLogin} disabled={!isEnabled}>
              <ButtonText>Ingresar</ButtonText>
            </LoginButton>
            <Pressable
              onPress={() => navigation.navigate(AUTH_ROUTES.REGISTER)}
            >
              <RegisterButton>Registrarse</RegisterButton>
            </Pressable>
          </Container>
        </BackImage>
      </MainView>
    </TouchableWithoutFeedback>
  );
}
