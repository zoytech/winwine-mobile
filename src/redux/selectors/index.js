import {removeIdenticalItemInArray} from 'src/utils';

const RECENTLY_KEYSTORE_LIMIT = 10;
const LIBRARY_KEYSTORE_LIMIT = 50;

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

export const recentlyKeyStoresSelector = state => {
  const rawKeyStores = state.recentlyKeyStore.recentlyKeyStores;
  const uniqueKeyStores = removeIdenticalItemInArray(rawKeyStores);
  uniqueKeyStores.length > RECENTLY_KEYSTORE_LIMIT
    ? uniqueKeyStores.splice(uniqueKeyStores.length - 1, 1)
    : uniqueKeyStores;
  return uniqueKeyStores;
};

export const libraryKeyStoreSelector = state => {
  const rawKeyStores = state.libraryKeyStore.libraryKeyStores;
  const uniqueKeyStores = removeIdenticalItemInArray(rawKeyStores);
  uniqueKeyStores.length > LIBRARY_KEYSTORE_LIMIT
    ? uniqueKeyStores.splice(uniqueKeyStores.length - 1, 1)
    : uniqueKeyStores;
  return uniqueKeyStores;
};
