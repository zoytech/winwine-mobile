import {
  FETCH_CARD_DECK_REQUEST,
  FETCH_CARD_DECK_ERROR,
  FETCH_CARD_DECK_SUCCESS,
} from '../constants/cardDeck';

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: {},
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
        success: true,
        data: payload || {},
      };
    case FETCH_CARD_DECK_ERROR:
      return {
        ...state,
        requesting: false,
        message: message,
      };
    default:
      return state;
  }
}

export default cardDeckReducer;
