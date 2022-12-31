import {useSelector} from 'react-redux';
import {
  FETCH_DECK_AND_CARDS_ERROR,
  FETCH_DECK_AND_CARDS_REQUEST,
  FETCH_DECK_AND_CARDS_SUCCESS,
} from 'src/redux/constants';
import {api, KEY} from 'src/constants';
import {addRecentlyKeyStore} from './addRecentlyKeyStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {keyStoresSelector} from '../selectors';

export default function loadCardDeckAndCardsByDeckId(cardDeckId) {
  return dispatch => {
    dispatch(fetchDbRequesting());

    const urls = [
      `${api?.HOST}/${api?.PATH}/card-decks/${cardDeckId}`,
      `${api?.HOST}/${api?.PATH}/card-decks/${cardDeckId}/cards`,
    ];

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const fetchJson = url => fetch(url, options).then(res => res.json());

    Promise.all(urls.map(fetchJson))
      .then(async ([cardDeckData, cardsData]) => {
        const cardDeck = cardDeckData?.data;
        const cards = cardsData?.data;
        dispatch(fetchDbSuccess({cardDeck, cards}));
        const keyStore = `${KEY?.RECENTLY_PLAY}/${cardDeckId}`;
        const jsonValue = JSON.stringify(cardDeck);
        await AsyncStorage.setItem(keyStore, jsonValue);
        console.log('success store local');
        dispatch(addRecentlyKeyStore(keyStore));
      })
      .catch(err => {
        dispatch(fetchDbError(err));
        console.log('Failed to save the data to the storage');
      });
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
