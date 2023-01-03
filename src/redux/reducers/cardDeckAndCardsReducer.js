import {
  FETCH_DECK_AND_CARDS_ERROR,
  FETCH_DECK_AND_CARDS_REQUEST,
  FETCH_DECK_AND_CARDS_SUCCESS,
} from 'src/redux/constants';

const initialState = {
  requesting: false,
  data: {},
  error: {},
};

function cardDeckAndCardsReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_DECK_AND_CARDS_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_DECK_AND_CARDS_SUCCESS:
      return {
        ...state,
        requesting: false,
        data:
          {
            cardDeck: payload?.cardDeck,
            cards: payload?.cards,
          } || {},
      };
    case FETCH_DECK_AND_CARDS_ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export default cardDeckAndCardsReducer;
