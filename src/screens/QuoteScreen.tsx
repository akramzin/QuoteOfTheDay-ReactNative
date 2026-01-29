import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Alert,
} from 'react-native';
import {getRandomQuote, Quote} from '../utils/quotesData';
import {saveFavorite, removeFavorite, isFavorite} from '../services/storageService';

interface QuoteScreenProps {
  onNavigateToFavorites: () => void;
}

const QuoteScreen: React.FC<QuoteScreenProps> = ({onNavigateToFavorites}) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    loadQuote();
  }, []);

  useEffect(() => {
    checkIfFavorite();
  }, [quote]);

  const checkIfFavorite = async () => {
    if (quote) {
      const favorite = await isFavorite(quote.id);
      setIsLiked(favorite);
    }
  };

  const loadQuote = () => {
    fadeAnim.setValue(0);
    const newQuote = getRandomQuote();
    setQuote(newQuote);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const handleFavoriteToggle = async () => {
    if (!quote) return;

    if (isLiked) {
      await removeFavorite(quote.id);
      setIsLiked(false);
      Alert.alert('Removed', 'Quote removed from favorites');
    } else {
      await saveFavorite(quote);
      setIsLiked(true);
      Alert.alert('Saved!', 'Quote added to favorites');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>DAILY QUOTE</Text>
          <View style={styles.headerLine} />
        </View>
        <TouchableOpacity
          onPress={onNavigateToFavorites}
          style={styles.favoritesButton}>
          <Text style={styles.favoritesButtonText}>FAVORITES →</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.quoteContainer, {opacity: fadeAnim}]}>
        <Text style={styles.quoteText}>"{quote?.content}"</Text>
        <View style={styles.authorContainer}>
          <View style={styles.authorLine} />
          <Text style={styles.authorText}>{quote?.author}</Text>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{quote?.category}</Text>
        </View>
      </Animated.View>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.likeButton, isLiked && styles.likeButtonActive]}
          onPress={handleFavoriteToggle}
          activeOpacity={0.8}>
          <Text style={styles.likeButtonText}>
            {isLiked ? '❤️' : '♡'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadQuote}
          activeOpacity={0.8}>
          <Text style={styles.refreshButtonText}>NEW QUOTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    width: 60,
    marginTop: 8,
  },
  favoritesButton: {
    paddingVertical: 4,
  },
  favoritesButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 2,
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  quoteText: {
    fontSize: 32,
    fontWeight: '300',
    color: '#ffffff',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  authorContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorLine: {
    width: 30,
    height: 1,
    backgroundColor: '#666',
    marginRight: 12,
  },
  authorText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
    letterSpacing: 1,
  },
  categoryBadge: {
    marginTop: 16,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00ff88',
    letterSpacing: 1.5,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  likeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButtonActive: {
    backgroundColor: '#2a1a1a',
    borderColor: '#ff4444',
  },
  likeButtonText: {
    fontSize: 24,
  },
  refreshButton: {
    flex: 1,
    backgroundColor: '#00ff88',
    paddingVertical: 18,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a0a0a',
    letterSpacing: 2,
  },
});

export default QuoteScreen;