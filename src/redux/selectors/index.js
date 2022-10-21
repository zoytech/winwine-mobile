export const cardDeckSelector = state => state.cardDeck.data;
export const requestingSelector = state => state.cardDeck.requesting;

export const popularCardDecksSelector = state => {
  console.log('popularCardDecksSelector: ', state.popularCardDecks.data);
  return state.popularCardDecks.data;
};
export const suggestedCardDecksSelector = state => {
  console.log('suggestedCardDecksSelector: ', state.suggestedCardDecks.data);
  return state.suggestedCardDecks.data;
};
export const recentlyCardDecksSelector = state => {
  console.log('recentlyCardDecksSelector: ', state.recentlyCardDecks.data);
  return state.recentlyCardDecks.data;
};
