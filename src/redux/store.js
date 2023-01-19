import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
  cardDeckReducer,
  cardDecksReducer,
  cardsReducer,
  hashtagsReducer,
  recentCardDecksReducer,
} from 'src/redux/slices';

const rootReducer = combineReducers({
  cardDecks: cardDecksReducer,
  cards: cardsReducer,
  storeCardDecks: cardDecksReducer,
  hashtagsReducer: hashtagsReducer,
  cardDeck: cardDeckReducer,
  recentlyCardDecks: recentCardDecksReducer,
});

export default function configureStore(preloadedState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(
    ...enhancers,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : noop => noop,
  );

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
