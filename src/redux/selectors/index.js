export const cardDeckSelector = state => state.cardDeck.data;
export const requestingCardDeckSelector = state => state.cardDeck.requesting;
export const cardDecksSelector = state => state.cardDecks.data;
export const requestingCardDecksSelector = state => state.cardDecks.requesting;
export const cardsSelector = state => state.cards.data;
export const requestingCardsSelector = state => state.cards.requesting;
export const hashtagsSelector = state => state.hashtags.data;
export const requestingHashtagsSelector = state => state.hashtags.requesting;

export const cardDeckAndCardsSelector = state => state.cardDeckAndCards.data;
export const requestingCardDeckAndCardsSelector = state =>
  state.cardDeckAndCards.requesting;
