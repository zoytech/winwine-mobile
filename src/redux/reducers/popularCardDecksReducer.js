import {
  FETCH_POPULAR_DECKS_ERROR,
  FETCH_POPULAR_DECKS_REQUEST,
  FETCH_POPULAR_DECKS_SUCCESS,
} from '../constants/popularCardDecks';

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: [],
};

function popularCardDecksReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_POPULAR_DECKS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_POPULAR_DECKS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: payload || [],
      };
    case FETCH_POPULAR_DECKS_ERROR:
      return {
        ...state,
        requesting: false,
        message: message,
      };
    default:
      return state;
  }
}

export default popularCardDecksReducer;
