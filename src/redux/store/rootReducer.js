import cardDeckReducer from '../reducers/cardDeckReducer';
import {combineReducers} from 'redux';
import cardDecksReducer from '../reducers/cardDecksReducer';
import cardsReducer from '../reducers/cardsReducer';
import hashtagsReducer from '../reducers/hashtagsReducer';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  cardDecks: cardDecksReducer,
  cards: cardsReducer,
  hashtags: hashtagsReducer,
});
export default rootReducer;
