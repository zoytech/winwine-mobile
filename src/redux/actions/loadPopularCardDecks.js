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
      dispatch({
        type: FETCH_POPULAR_DECKS_SUCCESS,
        payload: responseBody?.data,
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
