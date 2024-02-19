import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator } from "react-native";

// Composant triant les cocktails par le/les ingrédient(s) sélectionné(s) pas l'utilisateur
function CocktailsByIngredients({ selectedIngredient, navigation }) {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    if (selectedIngredient && selectedIngredient.length > 0) {
      // Map sur tout les ingrédients selectionnées puis requête API sur chacun d'eux
      const fetchPromises = selectedIngredient.map((ingredient) =>
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
          .then((response) => response.json())
          .then((data) =>
            data.drinks.map((drink) => ({
              id: drink.idDrink,
              name: drink.strDrink,
              image: drink.strDrinkThumb,
            }))
          )
      );

      // Promise.all pour attendre que tout les promises soient réalisées
      Promise.all(fetchPromises)
        .then((results) => {
          // On concatene l'array du résultat avec celui des cocktails
          const cocktailsData = [].concat(...results);
          setCocktails(cocktailsData);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedIngredient]);

  return (
    <View style={styles.ingredientContainer}>
      {cocktails ? (
        <FlatList
          style={styles.container}
          data={cocktails}
          keyExtractor={(item) => item.idDrink}
          numColumns={1}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} style={styles.containerItem} onPress={() => navigation.navigate("Cocktails", { screen: "Informations Cocktail", params: { cocktailId: item.id, previousPage: 'cocktailsByIngredients' } })}>
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemContent}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          removeClippedSubviews={true}
        />
      ) : (
        <View style={styles.containerItem}>
          <ActivityIndicator size="large" color="#FA6D6D" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ingredientContainer: {
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

export default CocktailsByIngredients;
