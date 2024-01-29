import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const frontStyle = isFlipped ? styles.cardFaceHidden : styles.cardFace;
  const backStyle = isFlipped ? styles.cardFace : styles.cardFaceHidden;

  return (
    <TouchableOpacity onPress={flipCard}>
      <View style={styles.card}>
        <View style={[styles.cardInner, frontStyle]}>
          <Text style={styles.question}>{question}</Text>
        </View>
        <View style={[styles.cardInner, backStyle]}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    perspective: 1000,
  },
  cardInner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFace: {
    transform: [{ rotateY: '0deg' }],
  },
  cardFaceHidden: {
    transform: [{ rotateY: '180deg' }],
  },
  question: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
  },
});

export default Flashcard;