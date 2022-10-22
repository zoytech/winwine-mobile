import cardDeckReducer from '../reducers/cardDeckReducer';
import {combineReducers} from 'redux';
import popularCardDecksReducer from '../reducers/popularCardDecksReducer';
import recentlyCardDecksReducer from '../reducers/recentlyCardDecksReducer';
import suggestedHashtagReducer from '../reducers/suggestedHashtagReducer';
import cardDeckListReducer from '../reducers/cardDeckListReducer';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  cardDeckList: cardDeckListReducer,
  popularCardDecks: popularCardDecksReducer,
  recentlyCardDecks: recentlyCardDecksReducer,
  suggestedCardDecks: suggestedHashtagReducer,
});
export default rootReducer;
