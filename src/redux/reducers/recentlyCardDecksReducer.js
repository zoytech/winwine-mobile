import {
  FETCH_RECENTLY_DECKS_ERROR,
  FETCH_RECENTLY_DECKS_REQUEST,
  FETCH_RECENTLY_DECKS_SUCCESS,
} from '../constants/recentlyCardDecks';

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: [],
};

function recentlyCardDecksReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_RECENTLY_DECKS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_RECENTLY_DECKS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: payload || [],
      };
    case FETCH_RECENTLY_DECKS_ERROR:
      return {
        ...state,
        requesting: false,
        message: message,
      };
    default:
      return state;
  }
}

export default recentlyCardDecksReducer;
