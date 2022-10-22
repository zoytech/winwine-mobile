import {configureStore} from '@reduxjs/toolkit';
import {
  popularCardDecksReducer,
  recentlyCardDecksReducer,
  suggestedHashtagReducer,
} from 'src/redux/reducers';
import {cardDeckReducer} from '../screens/gameScreens/cardDeckSlice';

// const reduxDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION;
const rootReducer = {
  cardDeck: cardDeckReducer,
  popularCardDecks: popularCardDecksReducer,
  recentlyCardDecks: recentlyCardDecksReducer,
  suggestedCardDecks: suggestedHashtagReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
