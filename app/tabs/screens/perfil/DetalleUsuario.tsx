import React ,{useState,useEffect}from 'react';
import { View, Text, TextInput,Pressable,StyleSheet } from 'react-native';
import { IUser } from '@shared/models/user';
import {MockUserService} from '@shared/models/mock-user.service';
import {colors} from '@utils/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-native';

//Validacion de formulario
const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string().email('Formato inválido').required('El email es obligatorio'),
});


const DetalleUsuarioScreen = () => {
   const [usuario, setUsuario] = useState<IUser | null>(null);

  useEffect(() => {
    // Inyecto el servicio y cargo al usuario al renderizar el componente
    const userData = MockUserService.obtenerUsuario();
    setUsuario(userData);
  }, []);

   const handleChange = (field: keyof IUser, value: string) => {
    if (!usuario) return;
    setUsuario({ ...usuario, [field]: value });
  };

  const handleGuardar = () => {
    // Acá podrías mandar a un servicio de API real
    console.log('Usuario actualizado:', usuario);
  };

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
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Usuario actualizado:', { ...usuario, ...values });
      }}
    >
      {({ handleChange, 
          handleBlur, 
          handleSubmit, 
          values, errors, touched }) => {
        
        const handleGuardar = () => {
          handleSubmit(); // ejecuta el submit de Formik
          Alert.alert(
                'Register',
                `Se ha modificado con exito!\n\nNombre: ${values.nombre}\nApellido ${values.apellido}\nMail: ${values.email}`,
                [{ text: 'OK', onPress: () => console.log('Aceptado') }],
              );
        };

        return (
          <View style={styles.container}>
            <Text style={styles.titulo}>Detalle del Usuario</Text>

            <TextInput
              style={styles.input}
              value={values.nombre}
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              placeholder="Nombre"
            />
            {touched.nombre && errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

            <TextInput
              style={styles.input}
              value={values.apellido}
              onChangeText={handleChange('apellido')}
              onBlur={handleBlur('apellido')}
              placeholder="Apellido"
            />
            {touched.apellido && errors.apellido && <Text style={styles.error}>{errors.apellido}</Text>}

            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            
            <Pressable style={styles.button} onPress={handleGuardar}>
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
    borderColor: colors.error,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
   button: {
      borderColor: colors.error,
      borderWidth: 2,
      borderStyle: 'solid',
      padding: 10,
      height: 50,    
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,    
      backgroundColor: colors.error,
    },
    textBoton: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    
    }
});

export default DetalleUsuarioScreen;
