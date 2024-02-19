import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Composant pour afficher des cocktails de façon aléatoire
function RandomCocktails({ navigation }) {
  const [cocktails, setCocktails] = useState([]);

  // Appel API asynchrone car répétition de l'appel pour récupérer 3 cocktails
  useEffect(() => {
    const loadRandomCocktails = async () => {
      let randomCocktails = [];

      // On boucle 3 fois sur l'appel API pour avoir 3 cocktails aléatoires
      for (let i = 0; i < 3; i++) {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const data = await response.json();
        const drink = data.drinks[0];
        const cocktailData = {
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        };
        randomCocktails.push(cocktailData);
      }

      setCocktails(randomCocktails);
    };

    loadRandomCocktails();
  }, []);

  return (
    <View style={styles.inspirationContent}>
      <Text style={styles.inspirationText}>Nos Tendances</Text>
      <View style={styles.inspirationSeparator}></View>
      <View style={styles.randomContainer}>
        {cocktails.map((cocktail, index) => (
          <TouchableOpacity
            key={cocktail.id}
            style={styles.containerCocktail}
            onPress={() => navigation.navigate("Cocktails", { screen: "Informations Cocktail", params: { cocktailId: cocktail.id, previousPage: 'inspiration' } })}
          >
            <View key={index} style={styles.randomContent}>
              <Text style={styles.randomText}>{cocktail.name}</Text>
              <Image source={{ uri: cocktail.image }} style={styles.imageRandom} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inspirationContent: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "start",
    flexDirection: "column",
    gap: 20,
  },
  inspirationText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#404040",
    paddingLeft: 24,
  },
  inspirationSeparator: {
    height: 3,
    width: "50%",
    borderRadius: 25,
    backgroundColor: "#FA6D6D",
    marginLeft: 24,
    marginBottom: 24,
  },
  randomContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  containerCocktail: {
    width: "27%",
  },
  randomContent: {
    width: "100%",
    gap: 20,
    flexDirection: "column-reverse",
    shadowColor: "#404040",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  randomText: {
    height: 100,
    flexWrap: "wrap",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#404040",
  },
  imageRandom: {
    width: "100%",
    height: 200,
    borderRadius: 25,
  },
});

export default RandomCocktails;
