import React from "react";
import { Text, StyleSheet } from "react-native";

const HourlyText = () => {
  return <Text style={styles.separationTitle}>Les prochaines températures</Text>;
};

const styles = StyleSheet.create({
  separationTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    width: "90%",
    marginTop: 20,
  },
});

export default HourlyText;
