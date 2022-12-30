import {ADD_DECK_ID} from '../constants';

export const addCardDeckId = cardDeckId => ({
  type: ADD_DECK_ID,
  payload: cardDeckId,
});
