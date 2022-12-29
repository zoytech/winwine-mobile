import cardDeckReducer from '../reducers/cardDeckReducer';
import {combineReducers} from 'redux';
import cardDecksReducer from '../reducers/cardDecksReducer';
import cardsReducer from '../reducers/cardsReducer';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  cardDecks: cardDecksReducer,
  cards: cardsReducer,
});
export default rootReducer;
