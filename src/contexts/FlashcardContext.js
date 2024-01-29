import React, { createContext, useState, useContext } from 'react';

const FlashcardContext = createContext();

export const useFlashcards = () => useContext(FlashcardContext);

export const FlashcardProvider = ({ children }) => {
  // Each flashcardStack is an object with 'title' and 'flashcards' (array)
  const [flashcardStacks, setFlashcardStacks] = useState([]);

  // Function to add a new flashcard stack
  const addFlashcardStack = (newFlashcards, title = "Untitled") => {
    const newStack = {
      title: title,
      flashcards: newFlashcards
    };
    // Add the new stack at the beginning of the array
    setFlashcardStacks([newStack, ...flashcardStacks]);
  };
  const removeFlashcard = (stackIndex, flashcardIndex) => {
    setFlashcardStacks(currentStacks => {
        const newStacks = [...currentStacks];
        newStacks[stackIndex].flashcards.splice(flashcardIndex, 1);
        return newStacks;
    });
};
  // Function to update a specific flashcard stack
  const updateFlashcardStack = (index, updatedStack) => {
    const updatedStacks = [...flashcardStacks];
    updatedStacks[index] = updatedStack;
    setFlashcardStacks(updatedStacks);
  };

  // Function to remove a specific flashcard stack
  const removeFlashcardStack = (index) => {
    const updatedStacks = flashcardStacks.filter((_, i) => i !== index);
    setFlashcardStacks(updatedStacks);
  };

  return (
    <FlashcardContext.Provider value={{ flashcardStacks, addFlashcardStack, updateFlashcardStack, removeFlashcardStack, removeFlashcard }}>
      {children}
    </FlashcardContext.Provider>
  );
};