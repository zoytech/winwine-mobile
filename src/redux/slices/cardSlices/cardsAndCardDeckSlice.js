import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY} from 'src/constants';
import {CardApi, CardDeckApi} from 'src/apis';
import {addRecentlyKeyStore} from 'src/redux/slices';

const FETCH_DECK_AND_CARDS = {
  REQUEST: 'FETCH_DECK_AND_CARDS_ERROR',
  SUCCESS: ' FETCH_DECK_AND_CARDS_REQUEST',
  ERROR: 'FETCH_DECK_AND_CARDS_SUCCESS',
};

const initialState = {
  requesting: false,
  data: {
    cardDeck: {},
    cards: [],
  },
  error: {},
};

export function loadCardDeckAndCardsByDeckId(cardDeckId) {
  return async dispatch => {
    dispatch(fetchDbRequesting());
    try {
      const [getCardDeckResp, getCardsResp] = await Promise.all([
        CardDeckApi.getCardDeckById(cardDeckId),
        CardApi.getCardsByCardDeckId(cardDeckId),
      ]);
      const cardDeck = getCardDeckResp?.data;
      const cards = getCardsResp?.data;
      dispatch(fetchDbSuccess({cardDeck, cards}));
    } catch (err) {
      dispatch(fetchDbError(err));
      console.log('Failed to save the data to the storage', err);
    }
  };
}

const fetchDbRequesting = () => ({
  type: FETCH_DECK_AND_CARDS.REQUEST,
});
const fetchDbSuccess = ({cardDeck, cards}) => ({
  type: FETCH_DECK_AND_CARDS.SUCCESS,
  payload: {cardDeck, cards},
});
const fetchDbError = err => ({
  type: FETCH_DECK_AND_CARDS.ERROR,
  payload: {err},
});

export function cardDeckAndCardsReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_DECK_AND_CARDS.REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_DECK_AND_CARDS.SUCCESS:
      return {
        ...state,
        requesting: false,
        data:
          {
            cardDeck: payload?.cardDeck,
            cards: payload?.cards,
          } || {},
      };
    case FETCH_DECK_AND_CARDS.ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export const cardDeckAndCardsSelect = state => state.cardDeckAndCards.data;
export const requestCardDeckAndCardsSelect = state =>
  state.cardDeckAndCards.requesting;
