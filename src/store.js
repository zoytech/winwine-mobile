import {configureStore} from '@reduxjs/toolkit';
import cardDeckReducer from './redux/reducers/cardDeckReducer';
import cardDecksReducer from './redux/reducers/cardDecksReducer';
import cardsReducer from './redux/reducers/cardsReducer';
import hashtagsReducer from './redux/reducers/hashtagsReducer';
import cardDeckAndCardsReducer from './redux/reducers/cardDeckAndCardsReducer';
import {recentlyKeyStoreReducer} from './redux/reducers/keyStoreReducer';
import {libraryKeyStoreReducer} from './redux/reducers/libraryKeyStoreReducer';

const rootReducer = {
  cardDeck: cardDeckReducer,
  cardDecks: cardDecksReducer,
  cards: cardsReducer,
  hashtags: hashtagsReducer,
  cardDeckAndCards: cardDeckAndCardsReducer,
  recentlyKeyStore: recentlyKeyStoreReducer,
  libraryKeyStore: libraryKeyStoreReducer,
};
export const store = configureStore({
  reducer: rootReducer,
});
