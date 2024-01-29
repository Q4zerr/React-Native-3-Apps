import { React, useState } from "react";
import { Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FavoriteContext } from "./context/FavoriteContext";
import { Ionicons } from "@expo/vector-icons";
// Components
import Cocktails from "./Cocktails/Cocktails";
import FavoriteList from "./Favorite/FavoriteList";
import CocktailDetails from "./Cocktails/CocktailDetails";
import Inspiration from "./Inspiration/Inspiration";
import Home from "./Home/Home";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CocktailStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CocktailsScreen" component={Cocktails} />
      <Stack.Screen name="Informations Cocktail" component={CocktailDetails} />
    </Stack.Navigator>
  );
}

function App() {
  const [favorites, setFavorites] = useState([]);

  // screenOptionsTab passé en paramètre à Tab.Navigator pour rendre plus lisible notre return
  const screenOptionsTab = ({ route }) => ({
    headerTitle: "",
    headerLeft: () => <Image source={require("./assets/AppCocktails.png")} style={{ width: 24, height: 24, marginLeft: 30, borderRadius: 4 }} />,
    headerRight: () => <Text style={{ marginRight: 30, color: "#404040", fontSize: 18, fontWeight: "500" }}>{route.name}</Text>,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      switch (route.name) {
        case "Cocktails":
          iconName = focused ? "beer" : "beer-outline";
          break;

        case "Mes Favoris":
          iconName = focused ? "heart" : "heart-outline";
          break;

        case "Inspiration":
          iconName = focused ? "bulb" : "bulb-outline";
          break;

        case "Accueil":
          iconName = focused ? "home" : "home-outline";
          break;
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#FA6D6D",
    tabBarInactiveTintColor: "#404040",
    tabBarStyle: [
      {
        display: "flex",
      },
      null,
    ],
  });

  // Barre de navigation en bas de l'écran
  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Accueil" screenOptions={screenOptionsTab}>
          <Tab.Screen name="Cocktails" component={CocktailStack} />
          <Tab.Screen name="Accueil" component={Home} />
          <Tab.Screen name="Inspiration" component={Inspiration} />
          <Tab.Screen name="Mes Favoris" component={FavoriteList} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoriteContext.Provider>
  );
}

export default App;
