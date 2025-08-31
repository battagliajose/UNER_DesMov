import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button, Pressable } from "react-native";
import { colors, sizes } from "../../utils";
import { Alert } from "react-native";


export default function Login(): React.JSX.Element {

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [pass, setPass] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const handleLogin = () => {
    // Este if nunca entra porque el boton de login se deshabilita
    // si los campos estan vacios. Lo dejo para ejemplificar manejo
    // de errores.
    if (!email || !pass) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    Alert.alert(
      "Login",
      `Login iniciado!\n\nEmail: ${email}\nPass: ${pass}`,
      [
        { text: "OK", onPress: () => console.log("Aceptado") }
      ]
    );

    console.log(`Login button pressed ${email} - ${pass}`);
  }

    useEffect(() => {
      if (email && pass) {
        setIsEnabled(true);
        setError(undefined);
      } else {
        setIsEnabled(false);
      }
    }, [email, pass]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login Screen MOCK</Text>
      <TextInput 
          style={styles.input} 
          placeholder="E-Mail" 
          value={email} 
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      <View style={styles.passContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            value={pass} 
            onChangeText={setPass}
            secureTextEntry = {!showPass}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Text> {showPass ? "🙈" : "👁️"} </Text>
          </TouchableOpacity>
        </View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Pressable onPress={handleLogin} disabled={!isEnabled}>
        <Text style={isEnabled ? styles.loginButton : styles.loginButtonDisabled}>Ingresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create ({
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
    backgroundColor: "gray",
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },
})