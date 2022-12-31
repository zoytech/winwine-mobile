import {removeIdenticalItemInArray} from 'src/utils';

const RECENTLY_KEYSTORE_LIMIT = 10;
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

export const keyStoresSelector = state => {
  const rawKeyStores = state.keyStore.keyStores;
  const uniqueKeyStores = removeIdenticalItemInArray(rawKeyStores);
  console.log('rawKeyStores.length: ', uniqueKeyStores.length);
  uniqueKeyStores.length > RECENTLY_KEYSTORE_LIMIT
    ? uniqueKeyStores.splice(uniqueKeyStores.length - 1, 1)
    : uniqueKeyStores;
  return uniqueKeyStores;
};
