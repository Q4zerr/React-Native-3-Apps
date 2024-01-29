import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

function MainInformation({ weatherData, celsiusValue, feelsLikeValue, minTempValue, maxTempValue }) {
  const iconcode = weatherData.weather[0].icon;
  const urlIcon = "http://openweathermap.org/img/w/" + iconcode + ".png";

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainContainerTitle}>{weatherData.name}</Text>
      <Image
        style={styles.mainContainerLogo}
        source={{
          uri: urlIcon,
        }}
      />
      <Text style={styles.mainContainerText}>{weatherData.weather[0].description}</Text>
      <Text style={styles.mainContainerSubtext}>{celsiusValue}</Text>
      <Text style={styles.mainContainerText}>Ressenti : {feelsLikeValue}</Text>
      <View style={styles.feelsContainer}>
        <Text style={styles.mainContainerTextSecond}>Min : {minTempValue}</Text>
        <Text style={styles.mainContainerTextSecond}>Max : {maxTempValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    width: "90%",
    backgroundColor: "#2685EA",
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  mainContainerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  mainContainerLogo: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 20,
  },
  feelsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  mainContainerText: {
    fontSize: 18,
    color: "#fff",
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
  mainContainerSubtext: {
    fontSize: 24,
    color: "#fff",
  },
});

export default MainInformation;
