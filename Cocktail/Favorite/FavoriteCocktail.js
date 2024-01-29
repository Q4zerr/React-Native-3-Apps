import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function FavoriteCocktail({ isFavorite, toggleFavorite }) {
  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="#FA6D6D" />
    </TouchableOpacity>
  );
}

export default FavoriteCocktail;
