class FlashcardStackModel {
    constructor() {
        this.flashcards = [];
    }

    // Add a new stack of flashcards
    addFlashcardStack(flashcardStack) {
        this.flashcards.push(...flashcardStack);
    }

    // Get all flashcard stacks
    getAllFlashcards() {
        return this.flashcards;
    }

    // Get a specific flashcard stack
    getFlashcardStack(index) {
        return this.flashcards[index];
    }

    // Remove a specific flashcard stack
    removeFlashcardStack(index) {
        this.flashcards.splice(index, 1);
    }

    // Update a specific flashcard stack
    updateFlashcardStack(index, newStack) {
        this.flashcards[index] = newStack;
    }

    // Clear all flashcard stacks
    clearAllFlashcards() {
        this.flashcards = [];
    }
}

// Export a singleton instance of the model
export default new FlashcardStackModel();