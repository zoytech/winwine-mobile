import {
  FETCH_HASHTAGS_ERROR,
  FETCH_HASHTAGS_REQUEST,
  FETCH_HASHTAGS_SUCCESS,
} from 'src/redux/constants';
import {HashtagApi} from 'src/apis';

export default function loadHashtags() {
  return async dispatch => {
    try {
      const response = await HashtagApi.getHashtags();
      const hashtagsData = response?.data;
      console.log('hashtagsData: ', hashtagsData);
      dispatch(fetchHashtagsRequest());
      dispatch(fetchHashtagsSuccess(hashtagsData));
    } catch (error) {
      dispatch(fetchHashtagsError(error));
    }
  };
}

export const fetchHashtagsRequest = () => ({
  type: FETCH_HASHTAGS_REQUEST,
});
export const fetchHashtagsSuccess = data => {
  return {
    type: FETCH_HASHTAGS_SUCCESS,
    payload: {data},
  };
};
export const fetchHashtagsError = err => ({
  type: FETCH_HASHTAGS_ERROR,
  payload: {err},
});
