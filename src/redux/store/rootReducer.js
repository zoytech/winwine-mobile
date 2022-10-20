import cardDeckReducer from '../reducers/cardDeckReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({cardDeck: cardDeckReducer});
export default rootReducer;
