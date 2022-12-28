import {
  FETCH_DECKS_ERROR,
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
} from '../constants';
import {api} from 'src/constants';

async function getCardDecks(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export default function loadCardDecks() {
  return async dispatch => {
    try {
      await getCardDecks(`${api?.HOST}/${api?.PATH}/card-decks`).then(data => {
        const cardDecksData = data?.data;
        dispatch(fetchDecksRequest());
        dispatch(fetchDecksSuccess(cardDecksData));
      });
    } catch (error) {
      dispatch(fetchDecksError(error));
    }
  };
}

export const fetchDecksRequest = () => ({
  type: FETCH_DECKS_REQUEST,
});
export const fetchDecksSuccess = data => {
  return {
    type: FETCH_DECKS_SUCCESS,
    payload: {data},
  };
};
export const fetchDecksError = err => ({
  type: FETCH_DECKS_ERROR,
  payload: {err},
});
