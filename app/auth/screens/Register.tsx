import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, materialColors, sizes } from '@utils/index';
import { Formik, Form, Field } from 'formik';
import { Alert } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { signUp } from '@shared/context/authContext/auth-service.ts';
import { AuthContext } from '@shared/context/authContext';

export default function Register() {
  const { dispatch } = useContext(AuthContext);
  const [showPass, setShowPass] = React.useState<boolean>(false);

  const navigation = useNavigation();

  interface IFormValues {
    nombre: string;
    apellido: string;
    dni: string;
    mail: string;
    password: string;
  }

  async function handleRegister(
    values: IFormValues,
    { resetForm }: { resetForm: () => void },
  ) {
    // Lógica de registro

    Alert.alert(
      'Register',
      `Se ha registrado con exito!\n\nNombre: ${values.nombre} ${values.apellido}\nDNI: ${values.dni} Pass: ${values.password}\nMail: ${values.mail}`,
      [{ text: 'OK', onPress: () => console.log('Aceptado') }],
    );

    console.log('Registrando usuario...', values);

    try {
      await signUp(dispatch, values.mail, values.password);
      Alert.alert('Registro exitoso');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }

    resetForm();
    navigation.navigate('Login' as never);
  }

  const FormValidationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('El apellido es obligatorio'),
    dni: Yup.string()
      .required('El DNI es obligatorio')
      .matches(/^[0-9]+$/, 'El DNI debe contener solo números'),
    mail: Yup.string()
      .email('El correo no es válido')
      .required('El correo es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
  });

  return (
    <Formik
      initialValues={{
        nombre: '',
        apellido: '',
        dni: '',
        mail: '',
        password: '',
      }}
      onSubmit={handleRegister}
      validationSchema={FormValidationSchema}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        isValid,
        handleBlur,
        touched,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ImageBackground
            source={require('../../../assets/images/back_register.png')} // tu imagen en assets
            style={styles.background}
            resizeMode="cover" // cover, contain o stretch
          >
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.nombre && errors?.nombre && styles.inputError,
                  ]}
                  placeholder="Nombre"
                  autoCapitalize="words"
                  value={values.nombre}
                  onChangeText={handleChange('nombre')}
                  onBlur={handleBlur('nombre')}
                  keyboardType="default"
                />
              </View>
              {touched.nombre && errors.nombre && (
                <Text style={{ color: 'red' }}>{errors.nombre}</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.apellido && errors?.apellido && styles.inputError,
                  ]}
                  placeholder="Apellido"
                  autoCapitalize="words"
                  value={values.apellido}
                  onChangeText={handleChange('apellido')}
                  onBlur={handleBlur('apellido')}
                  keyboardType="default"
                />
              </View>
              {touched.apellido && errors.apellido && (
                <Text style={{ color: 'red' }}>{errors.apellido}</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.dni && errors?.dni && styles.inputError,
                  ]}
                  placeholder="DNI"
                  value={values.dni}
                  onChangeText={handleChange('dni')}
                  onBlur={handleBlur('dni')}
                  keyboardType="number-pad"
                />
              </View>
              {touched.dni && errors.dni && (
                <Text style={{ color: 'red' }}>{errors.dni}</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.mail && errors?.mail && styles.inputError,
                  ]}
                  placeholder="Mail"
                  autoCapitalize="none"
                  value={values.mail}
                  onChangeText={handleChange('mail')}
                  onBlur={handleBlur('mail')}
                  keyboardType="email-address"
                />
              </View>
              {touched.mail && errors.mail && (
                <Text style={{ color: 'red' }}>{errors.mail}</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.password && errors?.password && styles.inputError,
                  ]}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  keyboardType="default"
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
              {touched.password && errors.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}
              <TouchableOpacity
                disabled={!isValid}
                onPress={() => handleSubmit()}
                style={
                  isValid
                    ? styles.registerButton
                    : styles.registerButtonDisabled
                }
              >
                <Text style={styles.buttonText}>Registrarse!</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      )}
    </Formik>
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
  input: {
    backgroundColor: 'white',
    width: '95%',
    height: 40,
    borderColor: colors.backgroundDash,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputError: {
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  registerButton: {
    backgroundColor: colors.buttonColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});
