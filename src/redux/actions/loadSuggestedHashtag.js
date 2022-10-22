import {
  FETCH_SUGGESTED_HASHTAG_ERROR,
  FETCH_SUGGESTED_HASHTAG_REQUEST,
  FETCH_SUGGESTED_HASHTAG_SUCCESS,
} from '../constants/suggestedHashtag';
import API from 'src/apis';

export function loadSuggestedHashtag() {
  return async dispatch => {
    try {
      dispatch({type: FETCH_SUGGESTED_HASHTAG_REQUEST});
      const responseBody = await API.getSuggestedHashtag();
      dispatch({
        type: FETCH_SUGGESTED_HASHTAG_SUCCESS,
        payload: responseBody?.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_SUGGESTED_HASHTAG_ERROR,
        message: error,
      });
    }
  };
}
