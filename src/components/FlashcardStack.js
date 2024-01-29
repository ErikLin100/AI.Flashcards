import React from 'react';
import { View, StyleSheet } from 'react-native';
import Flashcard from './Flashcard';

const FlashcardStack = ({ flashcards }) => {
    return (
        <View style={styles.container}>
            {flashcards.map((flashcard, index) => (
                <Flashcard
                    key={index}
                    question={flashcard.question}
                    answer={flashcard.answer}
                    
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Add more styling as needed
});

export default FlashcardStack;