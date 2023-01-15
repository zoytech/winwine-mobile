import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
  cardDeckAndCardsReducer,
  cardDeckReducer,
  cardDecksReducer,
  cardsReducer,
  hashtagsReducer,
  libraryKeysReducer,
  recentlyReducer,
  storeCardDecksReducer,
} from 'src/redux/slices';

const rootReducer = combineReducers({
  cardDeck: cardDeckReducer,
  cardDecks: cardDecksReducer,
  cards: cardsReducer,
  storeCardDecks: storeCardDecksReducer,
  hashtagsReducer: hashtagsReducer,
  cardDeckAndCards: cardDeckAndCardsReducer,
  recently: recentlyReducer,
  libraryKeys: libraryKeysReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION;
const thunkMiddleWare = applyMiddleware(thunk);

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers, thunkMiddleWare);
};
export default configureStore;
