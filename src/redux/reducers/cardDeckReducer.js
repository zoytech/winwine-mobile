import {
  FETCH_CARD_DECK_ERROR,
  FETCH_CARD_DECK_REQUEST,
  FETCH_CARD_DECK_SUCCESS,
} from '../constants/cardDeck';

const initialState = {
  requesting: false,
  data: {},
  error: {},
};

function cardDeckReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_CARD_DECK_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_CARD_DECK_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload || {},
      };
    case FETCH_CARD_DECK_ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export default cardDeckReducer;
