import {
  FETCH_DECKS_ERROR,
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
} from 'src/redux/constants';
import {CardDeckApi} from 'src/apis';

export default function loadCardDecks() {
  return async dispatch => {
    try {
      const response = await CardDeckApi.getCardDeckById();
      const cardDecksData = response?.data;
      dispatch(fetchDecksRequest());
      dispatch(fetchDecksSuccess(cardDecksData));
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
