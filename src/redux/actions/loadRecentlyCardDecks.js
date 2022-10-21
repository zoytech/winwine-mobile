import {
  FETCH_RECENTLY_DECKS_ERROR,
  FETCH_RECENTLY_DECKS_REQUEST,
  FETCH_RECENTLY_DECKS_SUCCESS,
} from '../constants/recentlyCardDecks';
import API from 'src/apis';

export function loadRecentlyCardDecks() {
  return async dispatch => {
    try {
      dispatch({type: FETCH_RECENTLY_DECKS_REQUEST});
      const responseBody = await API.getRecentlyCardDecks();
      console.log('getRecentlyCardDecks: ', responseBody);
      dispatch({
        type: FETCH_RECENTLY_DECKS_SUCCESS,
        data: responseBody,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_RECENTLY_DECKS_ERROR,
        message: error,
      });
    }
  };
}
