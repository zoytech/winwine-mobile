import {CardDeckApi} from 'src/apis';

const FETCH_DECKS = {
  REQUEST: 'FETCH_DECKS_ERROR',
  SUCCESS: ' FETCH_DECKS_REQUEST',
  ERROR: 'FETCH_DECKS_SUCCESS',
};
const initialState = {
  requesting: false,
  data: [],
  error: {},
};

export function loadCardDecks() {
  return async dispatch => {
    dispatch(fetchDecksRequest());
    try {
      const response = await CardDeckApi.getCardDecks();
      const cardDecksData = response?.data;
      dispatch(fetchDecksSuccess(cardDecksData));
    } catch (error) {
      console.log('loadCardDecks error:', error);
      dispatch(fetchDecksError(error));
    }
  };
}

const fetchDecksRequest = () => ({
  type: FETCH_DECKS.REQUEST,
});
const fetchDecksSuccess = data => {
  return {
    type: FETCH_DECKS.SUCCESS,
    payload: {data},
  };
};
const fetchDecksError = err => ({
  type: FETCH_DECKS.ERROR,
  payload: {err},
});

export function cardDecksReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_DECKS.REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_DECKS.SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload?.data || [],
      };
    case FETCH_DECKS.ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export const cardDecksSelect = state => state.cardDecks.data;
export const requestCardDecksSelect = state => state.cardDecks.requesting;
