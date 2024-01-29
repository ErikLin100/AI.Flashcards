import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { analyzeImagesWithOpenAI } from '../api/OpenAiService';
import { useFlashcards } from '../contexts/FlashcardContext'; 
const FlashcardCreationScreen = ({ navigation }) => {
  const { addFlashcardStack } = useFlashcards(); // Use the context hook
  const [images, setImages] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });
  
    if (!result.cancelled && result.assets && result.assets[0].base64) {
      setImages(prevImages => [...prevImages, result.assets[0].uri]);
      setBase64Strings(prevBase64 => [...prevBase64, result.assets[0].base64]);
    }
  };

  const handleCreateFlashcards = async () => {
    const validBase64Strings = base64Strings.filter(str => str);
  
    if (validBase64Strings.length === 0) {
      Alert.alert('Error', 'No images to process.');
      return;
    }
  
    try {
      const results = await analyzeImagesWithOpenAI(validBase64Strings);
      console.log("Results received from OpenAI API:", results);

      const title = "Stack created on " + new Date().toLocaleDateString();

      addFlashcardStack(results, title); // Use addFlashcardStack to add a new stack

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error processing images:', error);
      Alert.alert('Error', 'Failed to process images.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Image" onPress={selectImage} />
      <Text style={styles.counter}>
        {images.length} {images.length === 1 ? 'image' : 'images'} uploaded
      </Text>
      {images.length > 0 && (
        <Button title="Create Flashcards" onPress={handleCreateFlashcards} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  counter: {
    margin: 10,
    fontSize: 16,
  },
});

export default FlashcardCreationScreen;