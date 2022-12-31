import cardDeckReducer from '../reducers/cardDeckReducer';
import {combineReducers} from 'redux';
import cardDecksReducer from '../reducers/cardDecksReducer';
import cardsReducer from '../reducers/cardsReducer';
import hashtagsReducer from '../reducers/hashtagsReducer';
import cardDeckAndCardsReducer from '../reducers/cardDeckAndCardsReducer';
import keyStoreReducer from '../reducers/keyStoreReducer';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  cardDecks: cardDecksReducer,
  cards: cardsReducer,
  hashtags: hashtagsReducer,
  cardDeckAndCards: cardDeckAndCardsReducer,
  keyStore: keyStoreReducer,
});
export default rootReducer;
