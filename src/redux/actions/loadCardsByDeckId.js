import {api} from 'src/constants';
import {
  FETCH_CARDS_ERROR,
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
} from 'src/redux/constants';

async function getCardsByDeckById(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export default function loadCardsByDeckId(cardDeckId) {
  return async dispatch => {
    try {
      await getCardsByDeckById(
        `${api?.HOST}/${api?.PATH}/card-decks/${cardDeckId}/cards`,
      ).then(data => {
        const cardsData = data?.data;
        dispatch(fetchCardsRequest());
        dispatch(fetchCardsSuccess(cardsData));
      });
    } catch (error) {
      dispatch(fetchCardsError(error));
    }
  };
}

export const fetchCardsRequest = () => ({
  type: FETCH_CARDS_REQUEST,
});
export const fetchCardsSuccess = data => {
  return {
    type: FETCH_CARDS_SUCCESS,
    payload: {data},
  };
};
export const fetchCardsError = err => ({
  type: FETCH_CARDS_ERROR,
  payload: {err},
});
