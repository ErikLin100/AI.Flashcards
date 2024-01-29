import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFlashcards } from '../contexts/FlashcardContext'; 
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { flashcardStacks } = useFlashcards();
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {flashcardStacks.map((stack, index) => (
          <TouchableOpacity
            key={index}
            style={styles.stackButton}
            onPress={() => navigation.navigate('FlashcardPracticeScreen', { flashcards: stack.flashcards })}
          >
            <Text style={styles.stackButtonText}>{stack.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
  style={styles.createButton}
  onPress={() => navigation.navigate('FlashcardCreationScreen')}
>
  <AntDesign name="pluscircleo" size={34} color="black" />
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flex: 1,
  },
  stackButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'green',
  },
  stackButtonText: {
    color: 'white',
    fontSize: 16,
  },
  createButton: {
    
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;