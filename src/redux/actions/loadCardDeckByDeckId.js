import {api} from 'src/constants';
import {
  FETCH_DECK_ERROR,
  FETCH_DECK_REQUEST,
  FETCH_DECK_SUCCESS,
} from 'src/redux/constants';

async function getCardDeckById(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export default function loadCardDeckByDeckId(cardDeckId) {
  return async dispatch => {
    try {
      await getCardDeckById(
        `${api?.HOST}/${api?.PATH}/card-decks/${cardDeckId}`,
      ).then(data => {
        const cardDecksData = data?.data;
        dispatch(fetchDeckRequest());
        dispatch(fetchDeckSuccess(cardDecksData));
      });
    } catch (error) {
      dispatch(fetchDeckError(error));
    }
  };
}

export const fetchDeckRequest = () => ({
  type: FETCH_DECK_REQUEST,
});
export const fetchDeckSuccess = data => {
  return {
    type: FETCH_DECK_SUCCESS,
    payload: {data},
  };
};
export const fetchDeckError = err => ({
  type: FETCH_DECK_ERROR,
  payload: {err},
});
