import { Ionicons } from '@expo/vector-icons';
import { MockUserService } from '@shared/models/mock-user.service';
import { IUser } from '@shared/models/user';
import { colors } from '@utils/index';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Pressable, TextInput } from 'react-native';
import * as Yup from 'yup';

//Validacion de formulario
const validationSchema = Yup.object().shape({
  contrasena: Yup.string().required('Debe ingresar la nueva contraseña'),
  confirmacionContrasena: Yup.string().required('Debe ingresar la confirmación de la nueva contraseña'),
 });

const CambiarPasswordScreen = () => {

  const [usuario, setUsuario] = useState<IUser | null>(null);

   useEffect(() => {
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
    }

  return (
    <Formik
      //Inicializo el fomulario con los datos del service
      initialValues={{
        contrasena: '',
        confirmacionContrasena: '',
      }}
      validationSchema={validationSchema}
      validateOnMount={true}
      onSubmit={(values) => {
        console.log('Contraseña actualizada:', { ...usuario, ...values });
        Alert.alert(
          'Register',
          `Se ha modificado con exito!\n\nContraseña: ${values.contrasena}\nConfirmacion Contraseña: ${values.confirmacionContrasena}`,
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
            <Ionicons name="key-outline" size={100} color={colors.buttonColor} />
            <Text style={styles.titulo}>Ingrese su contraseña</Text>
            
            <TextInput
              style={styles.input}
              value={values.contrasena}
              onChangeText={handleChange('contrasena')}
              onBlur={handleBlur('contrasena')}
              placeholder="Nueva Contraseña"
              secureTextEntry
            />
            {touched.contrasena && errors.contrasena && (
              <Text style={styles.error}>{errors.contrasena}</Text>
            )}
            <TextInput
              style={styles.input}
              value={values.confirmacionContrasena}
              onChangeText={handleChange('confirmacionContrasena')}
              onBlur={handleBlur('confirmacionContrasena')}
              placeholder="Confirmar Nueva Contraseña"
              secureTextEntry
            />
            {touched.confirmacionContrasena && errors.confirmacionContrasena && (
              <Text style={styles.error}>{errors.confirmacionContrasena}</Text>
            )}
            <Pressable
                style={[
                  styles.button,
                  !(isValid && dirty) && { backgroundColor: '#ccc', borderColor: '#ccc' },
                  ]}
                onPress={() => handleSubmit()}
                disabled={!(isValid && dirty)}
              >
                <Text style={styles.textBoton}>Guardar Cambios</Text>
            </Pressable>
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
   error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    input: {
      width: '80%',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: colors.buttonColor,
  },
});

export default CambiarPasswordScreen;
