export const cardDeckSelector = state => state.cardDeck.data;
export const requestingDeckSelector = state => state.cardDeck.requesting;
export const cardDeckListSelector = state => state.cardDeckList.data;
export const cardDeckListSelector2 = state => state.cardDeckList2.data;

export const requestingDeckListSelector2 = state =>
  state.cardDeckList2.requesting;

export const requestingDeckListSelector = state =>
  state.cardDeckList.requesting;
