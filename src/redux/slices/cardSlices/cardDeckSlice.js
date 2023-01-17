import {CardDeckApi} from 'src/apis';
import {loadAllCardDeckSuccess, upsertCardDeckDetail} from './cardDecksSlice';

const CARD_DECK = {
  ADD_ALL_SUCCESS: 'ADD_ALL_SUCCESS',
  ADD_ALL_ERROR: 'ADD_ALL_ERROR',
  ADD_ALL_REQUEST: 'ADD_ALL_REQUEST',
  ADD_SOME_ERROR: 'ADD_SOME_ERROR',
  ADD_SOME_REQUEST: 'ADD_SOME_REQUEST',
};

const initialState = {
  requesting: false,
  data: {},
  error: {},
};

export function loadCardDeckByDeckId(cardDeckId) {
  return async dispatch => {
    dispatch({type: CARD_DECK?.ADD_ALL_REQUEST});
    try {
      const response = await CardDeckApi.getCardDeckById(cardDeckId);
      const cardDeck = response?.data;
      dispatch(upsertCardDeckDetail(cardDeck));
      dispatch({type: CARD_DECK?.ADD_ALL_SUCCESS, payload: {cardDeck}});
    } catch (error) {
      dispatch({type: CARD_DECK?.ADD_ALL_ERROR, payload: {error}});
      console.log('loadCardDeckByDeckId error: ', error);
    }
  };
}

export function loadCardDeckByDeckIds(cardDeckIds) {
  return async dispatch => {
    dispatch({type: CARD_DECK?.ADD_SOME_REQUEST});
    try {
      const response = await Promise.all(
        cardDeckIds.map(cardDeckId => CardDeckApi.getCardDeckById(cardDeckId)),
      );
      const cardDecks = response.map(cardDeck => cardDeck?.data);
      dispatch(loadAllCardDeckSuccess({cardDecks: cardDecks}));
    } catch (error) {
      dispatch({type: CARD_DECK?.ADD_SOME_ERROR, payload: {error}});
    }
  };
}

export function cardDeckReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case CARD_DECK.ADD_ALL_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case CARD_DECK.ADD_ALL_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload?.data || {},
      };
    case CARD_DECK.ADD_ALL_ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    case CARD_DECK.ADD_SOME_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case CARD_DECK.ADD_SOME_ERROR:
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
