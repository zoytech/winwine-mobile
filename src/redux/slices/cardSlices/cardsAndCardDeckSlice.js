import {KEY, LIMIT} from 'src/constants';
import {CardApi, CardDeckApi} from 'src/apis';
import {addRecentlyKeyStore} from 'src/redux/slices';
import {
  getStoreKeysFromStorage,
  replace,
  saveItemToStorage,
  select,
} from 'src/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      //get storageKeys
      const storageKey = `${KEY.DECKS_STORAGE}/${cardDeckId}`;
      const cardDeckKeys = await getStoreKeysFromStorage(KEY.RECENTLY_PLAY);
      //processed Key store
      cardDeckKeys.unshift(storageKey);
      const uniqueCardDecksKeys = select.uniqueElement(cardDeckKeys);
      replace.lastElementWhenExceedLength(
        uniqueCardDecksKeys,
        LIMIT.RECENTLY_CARD_DECKS,
      );
      //add new storageKey to storageKeys
      await AsyncStorage.setItem(
        KEY.RECENTLY_PLAY,
        JSON.stringify(uniqueCardDecksKeys),
      );
      dispatch(addRecentlyKeyStore(uniqueCardDecksKeys));

      //check is card deck in this pool or not
      const numberOfDeckKeys = await getStoreKeysFromStorage(KEY.DECK_COUNT);
      let currentKeyCount = numberOfDeckKeys[storageKey];
      if (currentKeyCount === 0 || currentKeyCount === undefined) {
        currentKeyCount += 1;
        await AsyncStorage.setItem(KEY.DECK_COUNT, currentKeyCount);
        //add card deck to card deck storage
        const jsonValue = JSON.stringify(cardDeck);
        await AsyncStorage.setItem(KEY.DECKS_STORAGE, jsonValue);
      }

      await saveItemToStorage(cardDeckId, KEY?.RECENTLY_PLAY, cardDeck);
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
