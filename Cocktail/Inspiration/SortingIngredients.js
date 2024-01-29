import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, View } from "react-native";
import CocktailsByIngredients from "./CocktailsByIngredients";

function SortingIngredients({ onIngredientSelected, navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

  // Appel API pour récupérer les ingrédients
  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
      .then((response) => response.json())
      .then((data) => {
        const ingredients = data.drinks.map((drink) => ({
          label: drink.strIngredient1,
          value: drink.strIngredient1.toLowerCase().replace(/ /g, "_"),
        }));
        setItems(ingredients);
      })
      .catch((error) => console.error(error));
  }, []);

  const selectedLabels = value.map((val) => items.find((item) => item.value === val).label);

  return (
    <View style={selectedLabels.length > 0 ? styles.containerFix : styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={true}
        min={0}
        max={10}
        placeholder="Sélectionnez des ingrédients..."
        multipleText={`${selectedLabels}`}
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropdownContainer}
        onChangeValue={(value) => {
          value.length > 0 ? onIngredientSelected(value) : onIngredientSelected(false);
        }}
      />
      {/* Si un ingrédient est selectionné alors on affiche les cocktails contenant le ou les ingrédient(s) sélectionné(s) */}
      {selectedLabels.length > 0 ? <CocktailsByIngredients selectedIngredient={selectedLabels} navigation={navigation} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  containerFix: {
    flex: 1,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  dropDown: {
    width: "auto",
    marginHorizontal: 30,
  },
  dropdownContainer: {
    width: "70%",
    marginHorizontal: 30,
  },
});

export default SortingIngredients;
