import {
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
  FETCH_DECKS_ERROR,
} from '../constants/cardDeckList';

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: {},
};

function cardDeckListReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_DECKS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_DECKS_SUCCESS:
      console.log('action: ', payload);
      return {
        ...state,
        requesting: false,
        success: true,
        data: payload?.data || [],
      };
    case FETCH_DECKS_ERROR:
      return {
        ...state,
        requesting: false,
        message: message,
      };
    default:
      return state;
  }
}

export default cardDeckListReducer;
