import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {getFavorites, removeFavorite} from '../services/storageService';
import {Quote} from '../utils/quotesData';

interface FavoritesScreenProps {
  onBack: () => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({onBack}) => {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const handleRemoveFavorite = async (quoteId: string) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this quote from favorites?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeFavorite(quoteId);
            loadFavorites();
          },
        },
      ],
    );
  };

  const renderQuoteItem = ({item}: {item: Quote}) => (
    <View style={styles.quoteCard}>
      <Text style={styles.quoteContent}>"{item.content}"</Text>
      <View style={styles.quoteFooter}>
        <View>
          <Text style={styles.quoteAuthor}>{item.author}</Text>
          <Text style={styles.quoteCategory}>{item.category}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleRemoveFavorite(item.id)}
          style={styles.removeButton}>
          <Text style={styles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAVORITES</Text>
        <View style={styles.headerLine} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the ❤️ button to save your favorite quotes
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderQuoteItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: 2,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: 3,
  },
  headerLine: {
    height: 2,
    backgroundColor: '#00ff88',
    width: 80,
    marginTop: 8,
  },
  listContent: {
    paddingBottom: 40,
  },
  quoteCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  quoteContent: {
    fontSize: 18,
    fontWeight: '300',
    color: '#ffffff',
    lineHeight: 28,
    marginBottom: 16,
  },
  quoteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
    marginBottom: 4,
  },
  quoteCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00ff88',
    letterSpacing: 1,
  },
  removeButton: {
    width: 32,
    height: 32,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
});

export default FavoritesScreen;