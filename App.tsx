import React, {useState} from 'react';
import QuoteScreen from './src/screens/QuoteScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<'quote' | 'favorites'>('quote');

  return (
    <>
      {currentScreen === 'quote' ? (
        <QuoteScreen onNavigateToFavorites={() => setCurrentScreen('favorites')} />
      ) : (
        <FavoritesScreen onBack={() => setCurrentScreen('quote')} />
      )}
    </>
  );
}

export default App;