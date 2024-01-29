import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import Flashcard from '../components/Flashcard';

const FlashcardPracticeScreen = ({ route }) => {
    const { flashcards } = route.params;
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
            >
                {flashcards.map((flashcard, index) => (
                    <View key={index} style={{ width: windowWidth, alignItems: 'center' }}>
                        <Flashcard
                            question={flashcard.question}
                            answer={flashcard.answer}
                            // onDelete={() => handleDelete(index)} // Uncomment if delete functionality is needed
                        />
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 1,
    },
   
});

export default FlashcardPracticeScreen;