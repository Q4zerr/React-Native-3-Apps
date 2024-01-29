import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FavoriteCocktail from '../Favorite/FavoriteCocktail';
import CocktailsByCategory from './CocktailsByCategory';
import { FavoriteContext } from '../context/FavoriteContext';

function Cocktails({navigation}) {
    // Déclaration des useState
    const [cocktails, setCocktails] = useState([]);
    const { favorites, setFavorites } = useContext(FavoriteContext);
    const [alphabet, setAlphabet] = useState('a');
    const [selectedValue, setSelectedValue] = useState('aucun');

    // useEffect pour charger les cocktails commencant par une autre lettre
    // La dépendance est alphabet et alphabet change de valeur quand on arrive
    // a la fin de la liste chargé de cocktails
    useEffect(() => {
        loadCocktails();
    }, [alphabet]);

    // Appel et récupération de données depuis l'API ThecocktailDB
    // Liste des cocktails commencant par la lettre (x)
    const loadCocktails = () => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alphabet}`)
            .then(response => response.json())
            .then(data => {
                let drinks = data.drinks;
                let cocktailsData = drinks.map(drink => ({
                    id: drink.idDrink,
                    name: drink.strDrink,
                    image: drink.strDrinkThumb
                }));
                setCocktails([...cocktails, ...cocktailsData]);
            })
            .catch(error => console.error(error));
    }

    // Récupération de la dernière lettre affiché
    // + modification si on est pas arrivé à la fin de l'alphabet
    const handleEnd = () => {
        let nextChar = String.fromCharCode(alphabet.charCodeAt(0) + 1);
        if (nextChar <= 'z') {
            setAlphabet(nextChar);
        }
    }

    // Déclaration lambda qui vérifie si le cocktail n'est pas dans la liste 
    // Si il l'est on l'enlève sinon on le rajoute dans la liste
    const toggleFavorite = (cocktail) => {
        const isFavorite = favorites.some(favorite => favorite.id === cocktail.id);
        if (isFavorite) {
            setFavorites(favorites.filter(favorite => favorite.id !== cocktail.id));
        } else {
            setFavorites([...favorites, cocktail]);
        }
    }
    
    if (!cocktails) {
        return (
            <View style={styles.containerItem}>
                <ActivityIndicator size="large" color="#FA6D6D" />
            </View>
        );
    }
    // Rendu de la vue
    return (
        <View style={styles.cocktailContainer}>
            <RNPickerSelect
                onValueChange={(value) => setSelectedValue(value)}
                placeholder={{
                    label: 'Trier les cocktails...',
                    value: 'aucun',
                }}
                items={[
                    { label: 'Ordinary Drink', value: 'Ordinary_Drink' },
                    { label: 'Cocktail', value: 'Cocktail' },
                    { label: 'Shake', value: 'Shake' },
                    { label: 'Other / Unknown', value: 'Other_/_Unknown' },
                    { label: 'Cocoa', value: 'Cocoa' },
                    { label: 'Shot', value: 'Shot' },
                    { label: 'Coffee / Tea', value: 'Coffee_/_Tea' },
                    { label: 'Homemade Liqueur', value: 'Homemade_Liqueur' },
                    { label: 'Punch / Party Drink', value: 'Punch_/_Party_Drink' },
                    { label: 'Beer', value: 'Beer' },
                    { label: 'Soft Drink', value: 'Soft_Drink' },
                ]}  
                style={pickerSelectStyles}
            />
            {selectedValue !== 'aucun' ? (
                <CocktailsByCategory
                    selectedValue={selectedValue} 
                    navigation={navigation} 
                    favorites={favorites} 
                    toggleFavorite={toggleFavorite}
                />
            ) : (
                <FlatList
                    style={styles.container}
                    data={cocktails}
                    keyExtractor={item => item.id}
                    onEndReached={handleEnd}
                    onEndReachedThreshold={0.5}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.containerItem} onPress={() => navigation.navigate('Informations Cocktail', { cocktailId: item.id })}>
                            <View style={styles.item}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.itemContent}>
                                    < FavoriteCocktail
                                        isFavorite={favorites.some(favorite => favorite.id === item.id)}
                                        toggleFavorite={() => toggleFavorite(item)}
                                    />
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cocktailContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    containerItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
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
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 14,
    },
    name: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#404040',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 25,
    },
});

const pickerSelectStyles = StyleSheet.create({
    // Style pour IOS
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#404040',
        borderRadius: 6,
        color: '#404040',
        marginHorizontal: 30,
        marginTop: 20,
    },
    // Style pour Android
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#404040',
        borderRadius: 6,
        color: '#404040',
        marginHorizontal: 30,
        marginTop: 20,
    },
});

export default Cocktails;