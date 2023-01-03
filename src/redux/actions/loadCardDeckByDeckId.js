import {
  FETCH_DECK_ERROR,
  FETCH_DECK_REQUEST,
  FETCH_DECK_SUCCESS,
} from 'src/redux/constants';
import {CardDeckApi} from 'src/apis';

export default function loadCardDeckByDeckId(cardDeckId) {
  return async dispatch => {
    try {
      const response = await CardDeckApi.getCardDeckById(cardDeckId);
      const cardDeckData = response?.data;
      dispatch(fetchDeckRequest());
      dispatch(fetchDeckSuccess(cardDeckData));
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
