import {
  FETCH_DECKS_ERROR_2,
  FETCH_DECKS_REQUEST_2,
  FETCH_DECKS_SUCCESS_2,
} from '../constants/cardDeckList';
import {api, HOST_DOMAIN, RESOURCE_PATH} from 'src/constants';

async function getPopularCardDecks(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export default function loadCardDeckList2() {
  return async dispatch => {
    try {
      await getPopularCardDecks(`${api?.HOST}/${api?.PATH}/card-decks`).then(
        data => {
          const cardDecksData = data?.data;
          dispatch(fetchDecksRequest());
          dispatch(fetchDecksSuccess(cardDecksData));
        },
      );
    } catch (error) {
      dispatch(fetchDecksError(error));
    }
  };
}

export const fetchDecksRequest = () => ({
  type: FETCH_DECKS_REQUEST_2,
});
export const fetchDecksSuccess = data => {
  return {
    type: FETCH_DECKS_SUCCESS_2,
    payload: {data},
  };
};
export const fetchDecksError = err => ({
  type: FETCH_DECKS_ERROR_2,
  payload: {err},
});
