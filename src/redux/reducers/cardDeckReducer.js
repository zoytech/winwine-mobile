import {
  FETCH_DECK_ERROR,
  FETCH_DECK_REQUEST,
  FETCH_DECK_SUCCESS,
} from 'src/redux/constants';

const initialState = {
  requesting: false,
  data: {},
  error: {},
};

function cardDeckReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_DECK_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_DECK_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload?.data || {},
      };
    case FETCH_DECK_ERROR:
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
