import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Composant pour affiché le détail de la recette d'un cocktail
function CocktailDetails({ route }) {
  const navigation = useNavigation();
  const { cocktailId, previousPage } = route.params;
  const [cocktailDetails, setCocktailDetails] = useState(null);

  // Construction de l'url de l'image du cocktail
  const createIngredientImageUrl = (ingredientName) => {
    var encodedIngredientName = encodeURIComponent(ingredientName);
    var url = "https://www.thecocktaildb.com/images/ingredients/" + encodedIngredientName + "-Medium.png";
    return url;
  };

  // Récupération de toutes les informations du cocktail grâce à son id
  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
      .then((response) => response.json())
      .then((data) => {
        let drink = data.drinks[0];
        let ingredients = [];
        // Boucle pour récupérer tout les ingrédients (leurs images, leur quantité et le nom de l'ingrédient)
        for (let i = 1; i <= 15; i++) {
          if (drink[`strIngredient${i}`]) {
            ingredients.push({
              ingredient: drink[`strIngredient${i}`],
              measure: drink[`strMeasure${i}`],
              imageUrl: createIngredientImageUrl(drink[`strIngredient${i}`]),
            });
          }
        }
        let cocktailData = {
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          ingredients: ingredients,
        };
        setCocktailDetails(cocktailData);
      })
      .catch((error) => console.error(error));
  }, []);

  // On défini le comportement des boutons selon la dernière page
  const returnButton = () => {
    switch (previousPage){
        case 'inspiration':
            return(
                <TouchableOpacity onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Inspiration' }],
                })} style={styles.returnButton}>
                    <Ionicons name={"arrow-back-circle-outline"} size={38} color="#FA6D6D" />
                </TouchableOpacity>
            )
        break;
        case 'favoris':
            return(
                <TouchableOpacity onPress={async () => {
                    navigation.goBack();
                    // Attendre une réponse et rediriger l'utilisateur sur les favoris
                    // Permet d'enlever la page informations cocktails et fixer un bug
                    await new Promise(resolve => setTimeout(resolve, 50));
                    navigation.navigate('Mes Favoris');
                }} style={styles.returnButton}>
                    <Ionicons name={"arrow-back-circle-outline"} size={38} color="#FA6D6D" />
                </TouchableOpacity>
            )
        break;
        case 'cocktails':
            return(
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.returnButton}>
                    <Ionicons name={"arrow-back-circle-outline"} size={38} color="#FA6D6D" />
                </TouchableOpacity>
            )
        break;
        case 'cocktailsByIngredients':
            return(
                <TouchableOpacity onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Inspiration' }],
                })} style={styles.returnButton}>
                    <Ionicons name={"arrow-back-circle-outline"} size={38} color="#FA6D6D" />
                </TouchableOpacity>
            )
        break;
    }
  }

  // Si le détail du cocktail n'a pas encore chargé alors on affiche un temps de chargement
  if (!cocktailDetails) {
    return (
      <View style={styles.containerDetails}>
        {returnButton()}
        <ActivityIndicator size="large" color="#FA6D6D" />
      </View>
    );
  }
  // Si le détail du cocktail à charger on affiche un design avec le cocktail, son nom et les ingrédients avec leurs infos
  return (
    <View style={styles.cocktailDetails}>
      {returnButton()}
      <View style={styles.containerDetails} key={cocktailDetails.idDrink}>
        <Text style={styles.cocktailName}>{cocktailDetails.name}</Text>
        <Image source={{ uri: cocktailDetails.image }} style={styles.image} />
        <View style={styles.containerIngredients}>
          {cocktailDetails.ingredients.map((item, index) => (
            <View key={index} style={styles.ingredient}>
              <Image source={{ uri: item.imageUrl }} style={styles.ingredientImage} />
              <Text style={styles.ingredientsQuantity}>
                {item.measure} - {item.ingredient}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cocktailDetails: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  returnButton: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  containerDetails: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  cocktailName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#404040",
  },
  containerIngredients: {
    gap: 10,
  },
  ingredient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ingredientImage: {
    width: 50,
    height: 50,
  },
  ingredientsQuantity: {
    fontSize: 15,
    color: "#404040",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
});

export default CocktailDetails;
