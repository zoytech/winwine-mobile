import {
  FETCH_DECKS_ERROR,
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
} from '../constants/cardDeckList';
import API from 'src/apis';
import {allSettled} from 'src/utils';

export function loadCardDeckList() {
  return async dispatch => {
    try {
      dispatch(fetchDecksRequest());
      const [
        suggestedHashtagData,
        recentlyCardDecksData,
        popularCardDecksData,
      ] = await allSettled([
        API.getSuggestedHashtag(),
        API.getRecentlyCardDecks(),
        API.getPopularCardDecks(),
      ]);
      const suggestData = suggestedHashtagData.value?.data;
      const popularData = popularCardDecksData.value?.data;
      const recentlyData = recentlyCardDecksData.value?.data;
      dispatch(fetchDecksSuccess({suggestData, popularData, recentlyData}));
    } catch (error) {
      dispatch(fetchDecksError(error));
    }
  };
}

export const fetchDecksRequest = () => ({
  type: FETCH_DECKS_REQUEST,
});

// export const fetchDecksSuccess = data => ({
//   type: FETCH_DECKS_SUCCESS,
//   payload: {data},
// });
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
