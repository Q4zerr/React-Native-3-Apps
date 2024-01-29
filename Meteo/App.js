import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import HourlyText from "./HourlyText";
import HourlyInformation from "./HourlyInformation";
import MainInformation from "./MainInformation";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [celsiusValue, setCelsiusValue] = useState(null);
  const [feelsLikeValue, setFeelsLikeValue] = useState(null);
  const [minTempValue, setMinTempValue] = useState(null);
  const [maxTempValue, setMaxTempValue] = useState(null);
  const API_KEY = "55c42720f63ecb07c419681acb446ebd";

  const setInformation = (celsiusValue, feelsLike, minTemp, maxTemp) => {
    setCelsiusValue(celsiusValue);
    setFeelsLikeValue(feelsLike);
    setMinTempValue(minTemp);
    setMaxTempValue(maxTemp);
  };

  // Appel API pour récupérer les informations en direct de la météo de la localisation de l'utilisateur
  useEffect(() => {
    const fetchWeatherData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("L'utilisateur n'a pas donné son accord pour partager sa localisation");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const url = `http://api.openweathermap.org/data/2.5/weather?lang=fr&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setWeatherData(data);
            const celsiusValue = (data.main.temp - 273.15).toFixed(1) + "°C";
            const feelsLike = (data.main.feels_like - 273.15).toFixed(1) + "°C";
            const minTemp = (data.main.temp_min - 273.15).toFixed(1) + "°C";
            const maxTemp = (data.main.temp_max - 273.15).toFixed(1) + "°C";
            setInformation(celsiusValue, feelsLike, minTemp, maxTemp);
          }
        });
    };

    fetchWeatherData();
  }, []);

  // Appel API pour récupérer les prévisions météorologique de la localisation de l'utilisateur
  useEffect(() => {
    const fetchWeatherData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("L'utilisateur n'a pas donné son accord pour partager sa localisation");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const url = `https://api.openweathermap.org/data/3.0/onecall?lang=fr&lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${API_KEY}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setOtherData(data);
            const celsiusValue = (data.main.temp - 273.15).toFixed(1) + "°C";
            const feelsLike = (data.main.feels_like - 273.15).toFixed(1) + "°C";
            const minTemp = (data.main.temp_min - 273.15).toFixed(1) + "°C";
            const maxTemp = (data.main.temp_max - 273.15).toFixed(1) + "°C";
            setInformation(celsiusValue, feelsLike, minTemp, maxTemp);
          }
        });
    };

    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      {weatherData && otherData ? (
        <View style={styles.mainApplication}>
          <MainInformation weatherData={weatherData} celsiusValue={celsiusValue} feelsLikeValue={feelsLikeValue} minTempValue={minTempValue} maxTempValue={maxTempValue} />
          <HourlyText />
          <HourlyInformation otherData={otherData} />
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainApplication: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
