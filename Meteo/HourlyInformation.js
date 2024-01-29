import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

function HourlyInformation({ otherData }) {
  return (
    <ScrollView style={styles.hourlyContainer} horizontal={true}>
      {otherData["hourly"].map((item, index) => {
        // Conversion du timestamp en heure précise
        const timestamp = item.dt;
        const date = new Date(timestamp * 1000);
        const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        // Récupération de la température et conversion de Kelvin en Celsius
        const celsiusValue = (item.temp - 273.15).toFixed(1) + "°C";
        // Récupération du temps (Soleil, Pluie...)
        const skyStatus = item.weather[0].main;

        return (
          <View key={index} style={styles.hourlyItem}>
            <Text style={styles.mainContainerTextSecondBold}>{time}</Text>
            <Text style={styles.mainContainerTextSecond}>{celsiusValue}</Text>
            <Text style={styles.mainContainerTextSecond}>{skyStatus}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hourlyContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "90%",
    marginTop: 20,
  },
  hourlyItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    margin: 10,
    backgroundColor: "#2685EA",
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  mainContainerTextSecond: {
    fontSize: 14,
    color: "#fff",
  },
  mainContainerTextSecondBold: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HourlyInformation;
