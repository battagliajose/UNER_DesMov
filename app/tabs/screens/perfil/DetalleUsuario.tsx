import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { IUser } from '@shared/models/user';
import { colors } from '@utils/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '@shared/context/authContext';

//Validacion de formulario
const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string()
    .email('Formato inválido')
    .required('El email es obligatorio'),
});

const DetalleUsuarioScreen = () => {
  const [usuario, setUsuario] = useState<IUser | null>(null);

  const { state } = useContext(AuthContext);

  /*useEffect(() => {
    // Inyecto el servicio y cargo al usuario al renderizar el componente
    const userData = MockUserService.obtenerUsuario();
    setUsuario(userData);
  }, []);

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }*/

  return (
    <Formik
      initialValues={{
        nombre: state.profile.nombre,
        apellido: state.profile.apellido,
        email: state.profile.email,
      }}
      validationSchema={validationSchema}
      validateOnMount={true}
      onSubmit={(values) => {
        console.log('Usuario actualizado:', { ...usuario, ...values });
        Alert.alert(
          'Register',
          `Se ha modificado con exito!\n\nNombre: ${values.nombre}\nApellido: ${values.apellido}\nMail: ${values.email}`,
          [{ text: 'OK' }],
        );
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        dirty,
        values,
        errors,
        touched,
      }) => {
        return (
          <View style={styles.container}>
            <Ionicons
              name="person-circle-outline"
              size={100}
              color={colors.buttonColor}
            />
            <Text style={styles.titulo}>Usuario</Text>
            <TextInput
              style={styles.input}
              value={values.nombre}
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              placeholder="Nombre"
              readOnly={true}
            />
            {/*touched.nombre && errors.nombre && (
              <Text style={styles.error}>{errors.nombre}</Text>
            )*/}

            <TextInput
              style={styles.input}
              value={values.apellido}
              onChangeText={handleChange('apellido')}
              onBlur={handleBlur('apellido')}
              placeholder="Apellido"
              readOnly={true}
            />
            {/*touched.apellido && errors.apellido && (
              <Text style={styles.error}>{errors.apellido}</Text>
            )*/}

            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Email"
              keyboardType="email-address"
              readOnly={true}
            />
            {/*touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )*/}

            {/*<Pressable
              style={[
                styles.button,
                !(isValid && dirty) && {
                  backgroundColor: '#ccc',
                  borderColor: '#ccc',
                },
              ]}
              onPress={() => handleSubmit()}
              disabled={!(isValid && dirty)}
            >
              <Text style={styles.textBoton}>Guardar Cambios</Text>
            </Pressable>*/}
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: colors.buttonColor,
    width: '80%',
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
  button: {
    borderColor: colors.buttonColor,
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.buttonColor,
  },
  textBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetalleUsuarioScreen;
