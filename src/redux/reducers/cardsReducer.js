import {
  FETCH_CARDS_ERROR,
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
} from 'src/redux/constants';

const initialState = {
  requesting: false,
  data: [],
  error: {},
};

function cardsReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_CARDS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload?.data || [],
      };
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export default cardsReducer;
