import cardDeckReducer from '../reducers/cardDeckReducer';
import {combineReducers} from 'redux';
import cardDecksReducer from '../reducers/cardDecksReducer';
import cardsReducer from '../reducers/cardsReducer';
import hashtagsReducer from '../reducers/hashtagsReducer';
import cardDeckAndCardsReducer from '../reducers/cardDeckAndCardsReducer';
import {recentlyKeyStoreReducer} from '../reducers/keyStoreReducer';
import {libraryKeyStoreReducer} from '../reducers/libraryKeyStoreReducer';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  cardDecks: cardDecksReducer,
  cards: cardsReducer,
  hashtags: hashtagsReducer,
  cardDeckAndCards: cardDeckAndCardsReducer,
  recentlyKeyStore: recentlyKeyStoreReducer,
  libraryKeyStore: libraryKeyStoreReducer,
});
export default rootReducer;
