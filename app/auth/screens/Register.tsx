import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, materialColors, sizes } from '@utils/index';
import { Formik, Form, Field } from 'formik';
import { Alert } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();

  interface IFormValues {
    nombre: string;
    apellido: string;
    dni: string;
    mail: string;
    password: string;
  }

  function handleRegister(
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
          <TextInput
            style={[
              styles.input,
              touched.nombre && errors?.nombre && styles.inputError,
            ]}
            placeholder="Nombre"
            value={values.nombre}
            onChangeText={handleChange('nombre')}
            onBlur={handleBlur('nombre')}
            keyboardType="default"
          />
          {touched.nombre && errors.nombre && (
            <Text style={{ color: 'red' }}>{errors.nombre}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.apellido && errors?.apellido && styles.inputError,
            ]}
            placeholder="Apellido"
            value={values.apellido}
            onChangeText={handleChange('apellido')}
            onBlur={handleBlur('apellido')}
            keyboardType="default"
          />
          {touched.apellido && errors.apellido && (
            <Text style={{ color: 'red' }}>{errors.apellido}</Text>
          )}
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
          {touched.dni && errors.dni && (
            <Text style={{ color: 'red' }}>{errors.dni}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.mail && errors?.mail && styles.inputError,
            ]}
            placeholder="Mail"
            value={values.mail}
            onChangeText={handleChange('mail')}
            onBlur={handleBlur('mail')}
            keyboardType="email-address"
          />
          {touched.mail && errors.mail && (
            <Text style={{ color: 'red' }}>{errors.mail}</Text>
          )}
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
            secureTextEntry={true}
          />
          {touched.password && errors.password && (
            <Text style={{ color: 'red' }}>{errors.password}</Text>
          )}
          <TouchableOpacity disabled={!isValid} onPress={() => handleSubmit()}>
            <Text>Registrarse!</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </Formik>
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
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputError: {
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
