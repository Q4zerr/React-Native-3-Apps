import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Composant principal, celui-ci retourne la page d'Accueil
function Home({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeText}>Découvrez notre application de Cocktails !</Text>
      <Image style={styles.homeImage} source={require("../assets/AppCocktails-XL.png")} />
      <View style={styles.cocktailContainer}>
        <TouchableOpacity style={styles.cocktailButton} onPress={() => navigation.navigate("Cocktails")}>
          <View style={styles.btnCocktailContainer}>
            <Ionicons name={"beer-outline"} size={64} color="#FA6D6D" />
            <Text style={styles.btnCocktailText}>Cocktails</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cocktailButton} onPress={() => navigation.navigate("Mes Favoris")}>
          <View style={styles.btnCocktailContainer}>
            <Ionicons name={"heart-outline"} size={64} color="#FA6D6D" />
            <Text style={styles.btnCocktailText}>Favoris</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    flex: 1,
  },
  homeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#404040",
    textAlign: "center",
    lineHeight: 38,
    paddingHorizontal: 40,
  },
  homeImage: {
    width: 125,
    height: 125,
    borderRadius: 12,
    marginBottom: 20,
  },
  cocktailContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 24,
  },
  cocktailButton: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#404040",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnCocktailContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  btnCocktailText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#404040",
  },
});

export default Home;
