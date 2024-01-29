import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { FlashcardProvider } from './src/contexts/FlashcardContext';
import 'react-native-gesture-handler'

const App = () => {
  return (
    <FlashcardProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FlashcardProvider>
  );
};

export default App;