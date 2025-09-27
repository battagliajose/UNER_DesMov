
import React, { useState } from "react";
import { colors } from "@utils/index";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
} from "react-native";
import Slider from "@react-native-community/slider";

const Notificaciones = () => {

    const [nivel, setNivel] = useState(50);

    return (    
        <View style={styles.container}>
            <Text style={styles.titulo}>Notificaciones</Text>
            <Text style={styles.label}>Volumen.</Text>
             <Slider
                style={{ width: "80%", height: 40 }}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={nivel}
                minimumTrackTintColor={colors.backgroundDash}
                maximumTrackTintColor={colors.backgroundDash}
                thumbTintColor={colors.backgroundDash}
                onValueChange={(value) => setNivel(value)}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    
  },
});

export default Notificaciones;
