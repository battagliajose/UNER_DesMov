import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CuentaUsuario from './components/cuentaUsuario';
import Preferencias from './components/preferencias';
import Acerca from './components/acerca';
import { colors } from "@utils/index";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>        
        <Text style={styles.headerTitle}>Perfil del Usuario</Text>
      </View>

      <ScrollView>
        <CuentaUsuario />
        <Preferencias />
        <Acerca />
      </ScrollView>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#111618",
    paddingRight: 48,
  },
});