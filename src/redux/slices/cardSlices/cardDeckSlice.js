import {CardDeckApi} from 'src/apis';
import {addStoreCardDecks} from './cardDecksSlice';
import {addRecentlyCardDeck} from '../keyStoreSlices';

const FETCH_DECK = {
  SUCCESS: 'FETCH_DECK_SUCCESS',
  REQUEST: 'FETCH_DECK_REQUEST',
  ERROR: 'FETCH_DECK_ERROR',
};
const initialState = {
  requesting: false,
  data: {},
  error: {},
};

export function loadCardDeckByDeckId(cardDeckId) {
  return async dispatch => {
    dispatch(fetchDeckRequest());
    try {
      const response = await CardDeckApi.getCardDeckById(cardDeckId);
      const cardDeck = response?.data;
      console.log('card deck in redux: ', cardDeck);
      dispatch(fetchDeckSuccess(cardDeck));
      dispatch(addStoreCardDecks(cardDeck));
      dispatch(addRecentlyCardDeck(cardDeck));
    } catch (error) {
      dispatch(fetchDeckError(error));
    }
  };
}

const fetchDeckRequest = () => ({
  type: FETCH_DECK.REQUEST,
});
const fetchDeckSuccess = data => {
  return {
    type: FETCH_DECK.SUCCESS,
    payload: {data},
  };
};
const fetchDeckError = err => ({
  type: FETCH_DECK.ERROR,
  payload: {err},
});

export function cardDeckReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_DECK.REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_DECK.SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload?.data || {},
      };
    case FETCH_DECK.ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export const cardDeckSelect = state => state.cardDeck.data;
export const requestCardDeckSelect = state => state.cardDeck.requesting;
