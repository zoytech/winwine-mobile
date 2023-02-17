import {CardApi} from 'src/apis';

const FETCH_CARDS = {
  SUCCESS: 'FETCH_CARDS_SUCCESS',
  REQUEST: 'FETCH_CARDS_REQUEST',
  ERROR: 'FETCH_CARDS_ERROR',
};
const initialState = {
  requesting: false,
  data: [],
  error: {},
};

export function loadCardsByDeckId(cardDeckId) {
  return async dispatch => {
    dispatch(fetchCardsRequest());
    try {
      const response = await CardApi.getCardsByCardDeckId(cardDeckId);
      const cardsData = response?.data;
      dispatch(fetchCardsSuccess(cardsData));
    } catch (error) {
      dispatch(fetchCardsError(error));
    }
  };
}

const fetchCardsRequest = () => ({
  type: FETCH_CARDS.REQUEST,
});
const fetchCardsSuccess = data => {
  return {
    type: FETCH_CARDS.SUCCESS,
    payload: {data},
  };
};
const fetchCardsError = err => ({
  type: FETCH_CARDS.ERROR,
  payload: {err},
});

export function cardsReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_CARDS.REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_CARDS.SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload?.data || [],
      };
    case FETCH_CARDS.ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export const cardsSelect = state => state.cards.data;
export const requestCardsSelect = state => state.cards.requesting;
