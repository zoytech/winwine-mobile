export const cardDeckSelector = state => state.cardDeck.data;
export const requestingSelector = state => state.cardDeck.requesting;
export const cardDeckListSelector = state => state.cardDeckList.data;
console.log();

export const popularCardDecksSelector = state => state.popularCardDecks.data;
export const suggestedCardDecksSelector = state =>
  state.suggestedCardDecks.data;
export const recentlyCardDecksSelector = state => state.recentlyCardDecks.data;
