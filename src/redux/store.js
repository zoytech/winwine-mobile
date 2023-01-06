import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
  cardDeckReducer,
  cardDecksReducer,
  cardsReducer,
  hashtagsReducer,
  recentlyKeyStoreReducer,
  cardDeckAndCardsReducer,
  libraryKeyStoreReducer,
} from 'src/redux/slices';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  cardDecks: cardDecksReducer,
  cards: cardsReducer,
  hashtagsReducer: hashtagsReducer,
  cardDeckAndCards: cardDeckAndCardsReducer,
  recentlyKeyStore: recentlyKeyStoreReducer,
  libraryKeyStore: libraryKeyStoreReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION;
const thunkMiddleWare = applyMiddleware(thunk);

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers, thunkMiddleWare);
};
export default configureStore;
