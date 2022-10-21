import {
  FETCH_CARD_DECK_ERROR,
  FETCH_CARD_DECK_REQUEST,
  FETCH_CARD_DECK_SUCCESS,
} from '../constants/cardDeck';
import API from 'src/apis';

export function loadCardDeckById(cardDeckId) {
  return async dispatch => {
    try {
      dispatch({type: FETCH_CARD_DECK_REQUEST});
      const responseBody = await API.getCardDeckById(cardDeckId);
      console.log('getCardDeckById: ', responseBody);
      dispatch({
        type: FETCH_CARD_DECK_SUCCESS,
        data: responseBody,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_CARD_DECK_ERROR,
        message: error,
      });
    }
  };
}
