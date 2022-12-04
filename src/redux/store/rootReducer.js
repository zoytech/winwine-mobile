import cardDeckReducer from '../reducers/cardDeckReducer';
import {combineReducers} from 'redux';
import popularCardDecksReducer from '../reducers/popularCardDecksReducer';
import recentlyCardDecksReducer from '../reducers/recentlyCardDecksReducer';
import suggestedHashtagReducer from '../reducers/suggestedHashtagReducer';
import cardDeckListReducer from '../reducers/cardDeckListReducer';
import cardDeckListReducer2 from '../reducers/cardDeckListReducer2';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  cardDeckList: cardDeckListReducer,
  cardDeckList2: cardDeckListReducer2,
  popularCardDecks: popularCardDecksReducer,
  recentlyCardDecks: recentlyCardDecksReducer,
  suggestedCardDecks: suggestedHashtagReducer,
});
export default rootReducer;
