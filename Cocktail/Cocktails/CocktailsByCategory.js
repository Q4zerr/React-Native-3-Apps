import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import FavoriteCocktail from "../Favorite/FavoriteCocktail";

// Composant permettant d'afficher des cocktails par catégorie
const CocktailsByCategory = ({ selectedValue, navigation, favorites, toggleFavorite }) => {
  const [cocktails, setCocktails] = useState([]);

  // Appel API pour récupérer les cocktails de la catégorie selectionné par l'utilisateur
  useEffect(() => {
    if (selectedValue) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedValue}`)
        .then((response) => response.json())
        .then((data) => {
          let drinks = data.drinks;
          let cocktailsData = drinks.map((drink) => ({
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
          }));
          setCocktails(cocktailsData);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedValue]);

  // Rendu de la vue de tout les cocktails contenu dans la catégorie selectionné par l'utilisateur
  return (
    <View style={styles.categoryContainer}>
      {/* Si des cocktails sont présent dans le résultat alors on les affiche */}
      {cocktails ? (
        <FlatList
          style={styles.container}
          data={cocktails}
          keyExtractor={(item) => item.idDrink}
          numColumns={1}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.containerItem} onPress={() => navigation.navigate("Informations Cocktail", { cocktailId: item.id })}>
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemContent}>
                  <FavoriteCocktail isFavorite={favorites.some((favorite) => favorite.id === item.id)} toggleFavorite={() => toggleFavorite(item)} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        // Si il n'y à pas encore de résultat alors on affiche un temps de chargement
        <View style={styles.containerItem}>
          <ActivityIndicator size="large" color="#FA6D6D" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  containerItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    paddingHorizontal: 20,
    marginBottom: 30,
    shadowColor: "#404040",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 14,
  },
  name: {
    flexWrap: "wrap",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#404040",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 25,
  },
});

export default CocktailsByCategory;
