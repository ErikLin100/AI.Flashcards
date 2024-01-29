import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import FlashcardCreationScreen from '../screens/FlashcardCreationScreen';
import FlashcardPracticeScreen from '../screens/FlashcardPracticeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: 'center', headerTitle: 'FlashcardAI' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FlashcardCreationScreen" component={FlashcardCreationScreen} />
      <Stack.Screen name="FlashcardPracticeScreen" component={FlashcardPracticeScreen} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;
