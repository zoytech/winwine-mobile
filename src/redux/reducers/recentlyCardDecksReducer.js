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

function recentlyCardDecksReducer(state = initialState, payload) {
  const {type, data, message} = payload;
  switch (type) {
    case FETCH_RECENTLY_DECKS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_RECENTLY_DECKS_SUCCESS:
      console.log('recentlyCardDecksReducer', payload);
      return {
        ...state,
        requesting: false,
        success: true,
        data: data || [],
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
