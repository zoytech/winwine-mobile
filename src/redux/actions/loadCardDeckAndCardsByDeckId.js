import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FETCH_DECK_AND_CARDS_ERROR,
  FETCH_DECK_AND_CARDS_REQUEST,
  FETCH_DECK_AND_CARDS_SUCCESS,
} from 'src/redux/constants';
import {KEY} from 'src/constants';
import {CardApi, CardDeckApi} from 'src/apis';
import {addRecentlyKeyStore} from './recentlyKeyStoreActions';

export default function loadCardDeckAndCardsByDeckId(cardDeckId) {
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

      const storageKey = `${KEY?.RECENTLY_PLAY}/${cardDeckId}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(cardDeck));
      dispatch(addRecentlyKeyStore(storageKey));
      const storeKeys = [];
      storeKeys.push(storageKey);
      console.log('save storeKeys: ', storeKeys);
      await AsyncStorage.setItem(KEY.MAIN, JSON.stringify(storeKeys));
    } catch (err) {
      dispatch(fetchDbError(err));
      console.log('Failed to save the data to the storage', err);
    }
  };
}

export const fetchDbRequesting = () => ({
  type: FETCH_DECK_AND_CARDS_REQUEST,
});

export const fetchDbSuccess = ({cardDeck, cards}) => ({
  type: FETCH_DECK_AND_CARDS_SUCCESS,
  payload: {cardDeck, cards},
});

export const fetchDbError = err => ({
  type: FETCH_DECK_AND_CARDS_ERROR,
  payload: {err},
});
