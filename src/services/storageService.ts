import AsyncStorage from '@react-native-async-storage/async-storage';
import {Quote} from '../utils/quotesData';

const FAVORITES_KEY = '@favorites';

export const saveFavorite = async (quote: Quote): Promise<void> => {
  try {
    const existingFavorites = await getFavorites();
    const isAlreadyFavorite = existingFavorites.some(fav => fav.id === quote.id);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...existingFavorites, quote];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error saving favorite:', error);
  }
};

export const removeFavorite = async (quoteId: string): Promise<void> => {
  try {
    const existingFavorites = await getFavorites();
    const updatedFavorites = existingFavorites.filter(
      fav => fav.id !== quoteId,
    );
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export const getFavorites = async (): Promise<Quote[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const isFavorite = async (quoteId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.id === quoteId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};