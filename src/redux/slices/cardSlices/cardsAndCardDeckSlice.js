import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY, renderLimit} from 'src/constants';
import {CardApi, CardDeckApi} from 'src/apis';
import {addRecentlyKeyStore} from 'src/redux/slices';
import {replace, select} from 'src/utils';

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
      console.log('cardDeck: ', cardDeck?.cardDeckName);
      const storageKey = `${KEY?.RECENTLY_PLAY}/${cardDeckId}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(cardDeck));
      dispatch(addRecentlyKeyStore(storageKey));
      const getMainKeyRqs = await AsyncStorage.getItem(KEY.SAVE_LIB);
      const storeKeys = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
      storeKeys.unshift(storageKey);
      console.log('storeKeys: ', storeKeys);
      const uniqueStoreKeys = select.uniqueElement(storeKeys);
      const sortedUniqueStoreKeys = replace.lastElementWhenExceedLength(
        uniqueStoreKeys,
        renderLimit?.RECENTLY_CARD_DECKS,
      );
      console.log('sortedUniqueStoreKeys: ', sortedUniqueStoreKeys);

      await AsyncStorage.setItem(
        KEY.SAVE_LIB,
        JSON.stringify(sortedUniqueStoreKeys),
      );
      console.log('____________________________');
    } catch (err) {
      dispatch(fetchDbError(err));
      console.log(
        'loadCardDeckAndCardsByDeckId-cardDeckId error',
        cardDeckId,
        err,
      );
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
