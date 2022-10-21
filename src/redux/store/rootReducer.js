import cardDeckReducer from '../reducers/cardDeckReducer';
import {combineReducers} from 'redux';
import popularCardDecksReducer from '../reducers/popularCardDecksReducer';
import recentlyCardDecksReducer from '../reducers/recentlyCardDecksReducer';
import suggestedHashtagReducer from '../reducers/suggestedHashtagReducer';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  popularCardDecks: popularCardDecksReducer,
  recentlyCardDecks: recentlyCardDecksReducer,
  suggestedCardDecks: suggestedHashtagReducer,
});
export default rootReducer;
