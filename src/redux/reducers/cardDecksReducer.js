import {
  FETCH_DECKS_ERROR,
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
} from '../constants';

const initialState = {
  requesting: false,
  data: [],
  error: {},
};

function cardDecksReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_DECKS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_DECKS_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload?.data || [],
      };
    case FETCH_DECKS_ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export default cardDecksReducer;
