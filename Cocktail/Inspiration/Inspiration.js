import { React, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import RandomCocktails from "./RandomCocktails";
import SortingIngredients from "./SortingIngredients";

function Inspiration({ navigation }) {
    const [ingredientSelected, setIngredientSelected] = useState(false);

    const onIngredientSelected = (isSelected) => {
        setIngredientSelected(isSelected);
    };

    return(
        <View style={styles.inspirationContainer}>
            <Text style={styles.headingInspiration}>Trouvez de l'inspiration !</Text>
            <SortingIngredients onIngredientSelected={onIngredientSelected} navigation={navigation} />
            {!ingredientSelected && <RandomCocktails navigation={navigation} />}
        </View>
    );
}

const styles = StyleSheet.create({
    inspirationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    headingInspiration: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#404040',
        textAlign: 'center',
        lineHeight: 38,
        marginVertical: 30,
    }
});

export default Inspiration;
