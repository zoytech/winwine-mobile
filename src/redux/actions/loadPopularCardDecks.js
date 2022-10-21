import {
  FETCH_POPULAR_DECKS_ERROR,
  FETCH_POPULAR_DECKS_REQUEST,
  FETCH_POPULAR_DECKS_SUCCESS,
} from '../constants/popularCardDecks';
import API from 'src/apis';

export function loadPopularCardDecks() {
  return async dispatch => {
    try {
      dispatch({type: FETCH_POPULAR_DECKS_REQUEST});
      const responseBody = await API.getPopularCardDecks();
      console.log('getPopularCardDecks(): ', responseBody);
      dispatch({
        type: FETCH_POPULAR_DECKS_SUCCESS,
        data: responseBody,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_POPULAR_DECKS_ERROR,
        message: error,
      });
    }
  };
}
