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
        popularCardDecksData,
        recentlyCardDecksData,
      ] = await allSettled([
        API.getSuggestedHashtag(),
        API.getRecentlyCardDecks(),
        API.getPopularCardDecks(),
      ]);
      const suggestData = suggestedHashtagData.value?.data;
      const popularData = popularCardDecksData.value?.data;
      const recentlyData = recentlyCardDecksData.value?.data;

      console.log('suggestedHashtagData: ', suggestData);
      console.log('popularCardDecksData: ', popularData);
      console.log('recentlyCardDecksData: ', recentlyData);
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
  const {popularData} = data;
  console.log('popularData', popularData);

  return {
    type: FETCH_DECKS_SUCCESS,
    payload: {data},
  };
};
export const fetchDecksError = err => ({
  type: FETCH_DECKS_ERROR,
  payload: {err},
});
