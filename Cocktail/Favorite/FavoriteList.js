import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FavoriteContext } from '../context/FavoriteContext';
import { Ionicons } from '@expo/vector-icons';

function FavoriteList({ navigation }) {
    const { favorites, setFavorites } = useContext(FavoriteContext);

    // Lambda pour supprimer le favoris de la liste de favoris
    const removeFavorite = (id) => {
        setFavorites(favorites.filter(item => item.id !== id));
    }

    return (
        <FlatList
            ListHeaderComponent={
                favorites.length > 0 
                ? <Text style={styles.title}>Vos Cocktails Favoris</Text>
                : <Text style={styles.title}>Aucun Cocktail ici !</Text>
            }
            style={styles.container}
            data={favorites}
            keyExtractor={item => item.id}
            numColumns={1}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.containerItem} onPress={() => navigation.navigate('Informations Cocktail', { cocktailId: item.id })}>
                    <View style={styles.item}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.itemContent}>
                            <TouchableOpacity style={styles.returnButton} onPress={() => removeFavorite(item.id)}>
                                <Ionicons name={"trash-outline"} size={24} color="#FA6D6D" />
                            </TouchableOpacity>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#404040',
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
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
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
        borderRadius: 20,
    },
});

export default FavoriteList;
