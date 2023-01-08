import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
  cardDeckAndCardsReducer,
  cardDeckReducer,
  cardDecksReducer,
  cardsReducer,
  recentlyKeyStoreReducer,
} from 'src/redux/slices';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  cardDecks: cardDecksReducer,
  cards: cardsReducer,
  cardDeckAndCards: cardDeckAndCardsReducer,
  recentlyKeyStore: recentlyKeyStoreReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION;
const thunkMiddleWare = applyMiddleware(thunk);

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers, thunkMiddleWare);
};
export default configureStore;
