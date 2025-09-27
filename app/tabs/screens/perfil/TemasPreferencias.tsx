import React, { useState } from "react";
import { colors } from "@utils/index";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
} from "react-native";

const TemasPreferencias = () => {
  const [modoOscuro, setmodoOscuro] = useState(false);
  const [textoGrande, settextoGrande] = useState(false);
  const [colorTablero, setcolorTablero] = useState(colors.backgroundColor);

  const colores = [colors.error, colors.buttonColor, colors.backgroundDash]; // colores elegidos de utils

  // Estilos condicionales para modo oscuro y claro
  const containerStyle = modoOscuro ? styles.containerDark : styles.containerLight;
  // Estilos condicionales para el texto
  const textStyle = modoOscuro ? styles.textDark : styles.textLight;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.titulo, textStyle]}>Personalizar Apariencia</Text>

      {/* Modo Oscuro*/}
      <Text style={[styles.label, { marginTop: 16 }, textStyle]}>Temas</Text>
      <View style={styles.row}>
        <Text style={[styles.opcionesTexto, textStyle]}>Modo Oscuro</Text>
        <Switch value={modoOscuro} onValueChange={setmodoOscuro} />
      </View>

      {/*Opciones para modificar el tamaño de letras*/}
         <Text style={[styles.label, { marginTop: 16 }, textStyle]}>Tamaño de Letras</Text>
      <View style={styles.row}>
        <Text style={[styles.opcionesTexto, textStyle]}>Texto Grande</Text>
        <Switch value={textoGrande} onValueChange={settextoGrande} />
      </View>

      {/* Opciones de colore */}
      <Text style={[styles.label, { marginTop: 16 }, textStyle]}>
        Color de acento
      </Text>
      <View style={styles.colorsContainer}>
        {colores.map((color) => (
          <Pressable
            key={color}
            onPress={() => setcolorTablero(color)}
            style={[
              styles.colorBox,
              { backgroundColor: color },
              colorTablero === color && styles.selectedColor,
            ]}
          />
        ))}
      </View>

      {/* Vista de muestra */}
      <View
        style={[
          styles.preview,
          {
            backgroundColor: colorTablero,
          },
        ]}
      >
        <Text
          style={{
            color: "white",
            fontSize: textoGrande ? 20 : 14,
          }}
        >
          Texto Boton de Muestra
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
  },
  // Estilos para el modo claro
  containerLight: {
    backgroundColor: "#fff",
  },
  textLight: {
    color: "#292828ff",
  },
    // Estilos para el modo oscuro
  containerDark: {
    backgroundColor:"#363535ff",
  },
  textDark: {
    color: "#fff",
  },
  // Fin de los estilos de modo claro y oscuro
  titulo: { 
    fontSize: 20,
    fontWeight: "bold", 
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  label: { 
    fontSize: 20, 
    fontWeight: "bold", 
  },
  opcionesTexto:{
    fontSize: 16,
  },
  colorsContainer: {
    flexDirection: "row",
    marginVertical: 12,
    gap: 10,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColor: {
    borderColor: "#000",
  },
  preview: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default TemasPreferencias;