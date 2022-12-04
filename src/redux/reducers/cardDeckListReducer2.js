import {
  FETCH_DECKS_ERROR_2,
  FETCH_DECKS_REQUEST_2,
  FETCH_DECKS_SUCCESS_2,
} from '../constants/cardDeckList';

const initialState = {
  requesting: false,
  data: [],
  error: {},
};

function cardDeckListReducer2(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_DECKS_REQUEST_2:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_DECKS_SUCCESS_2:
      return {
        ...state,
        requesting: false,
        data: payload?.data || [],
      };
    case FETCH_DECKS_ERROR_2:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export default cardDeckListReducer2;
