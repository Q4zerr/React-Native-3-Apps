import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [celsiusValue, setCelsiusValue] = useState(null);
  const [feelsLikeValue, setFeelsLikeValue] = useState(null);
  const [minTempValue, setMinTempValue] = useState(null);
  const [maxTempValue, setMaxTempValue] = useState(null);
  const API_KEY = '55c42720f63ecb07c419681acb446ebd';

  useEffect(() => {
    const fetchWeatherData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const url = `http://api.openweathermap.org/data/2.5/weather?lang=fr&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      console.log(url);

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if(data){
            setWeatherData(data);
            const celsiusValue = (data.main.temp - 273.15).toFixed(1) + '°C';
            const feelsLike = (data.main.feels_like - 273.15).toFixed(1) + '°C';
            const minTemp = (data.main.temp_min - 273.15).toFixed(1) + '°C';
            const maxTemp = (data.main.temp_max - 273.15).toFixed(1) + '°C';
            setInformation(celsiusValue, feelsLike, minTemp, maxTemp);  
          }
        });
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const url = `https://api.openweathermap.org/data/3.0/onecall?lang=fr&lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${API_KEY}`
      console.log(url);

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if(data){
            setOtherData(data);
            const celsiusValue = (data.main.temp - 273.15).toFixed(1) + '°C';
            const feelsLike = (data.main.feels_like - 273.15).toFixed(1) + '°C';
            const minTemp = (data.main.temp_min - 273.15).toFixed(1) + '°C';
            const maxTemp = (data.main.temp_max - 273.15).toFixed(1) + '°C';
            setInformation(celsiusValue, feelsLike, minTemp, maxTemp);
          }
        });
    };

    fetchWeatherData();
  }, [])

  const setInformation = (celsiusValue, feelsLike, minTemp, maxTemp) => {
    setCelsiusValue(celsiusValue);
    setFeelsLikeValue(feelsLike);
    setMinTempValue(minTemp);
    setMaxTempValue(maxTemp);
  };

  const MainInformation = () => {
    const iconcode = weatherData.weather[0].icon;
    const urlIcon = 'http://openweathermap.org/img/w/' + iconcode + '.png';

    return(
      <View style={styles.mainContainer}>
        <Text style={styles.mainContainerTitle}>{weatherData.name}</Text>
        <Image style={styles.mainContainerLogo}
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
  };

  const HourlyText = () => {
    return(
      <Text style={styles.separationTitle}>Les prochaines températures</Text>
    )
  };

  const HourlyInformation = () => {
    return(
      <ScrollView style={styles.hourlyContainer} horizontal={true}>
        {otherData['hourly'].map((item, index) => {
          // Conversion du timestamp en heure précise
          const timestamp = item.dt;
          const date = new Date(timestamp * 1000);
          const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          // Récupération de la température et conversion de Kelvin en Celsius
          const celsiusValue = (item.temp - 273.15).toFixed(1) + '°C';
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
  };

  return (
    <View style={styles.container}>
      {weatherData && otherData ? (
        <View style={styles.mainApplication}>
          <MainInformation/>
          <HourlyText/>
          <HourlyInformation/>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainApplication: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  mainContainer: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    width: '90%',
    backgroundColor: '#2685EA',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  feelsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  mainContainerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  mainContainerLogo: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 20,
  },
  mainContainerText: {
    fontSize: 18,
    color: '#fff',
  },
  mainContainerTextSecond: {
    fontSize: 14,
    color: '#fff',
  },
  mainContainerTextSecondBold: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  mainContainerSubtext: {
    fontSize: 24,
    color: '#fff',
  },
  hourlyContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    width: '90%',
    marginTop: 20,
  },
  hourlyItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    backgroundColor: '#2685EA',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  separationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '90%',
    marginTop: 20,
  },
});
