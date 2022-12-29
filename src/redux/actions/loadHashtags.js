import {
  FETCH_HASHTAGS_ERROR,
  FETCH_HASHTAGS_REQUEST,
  FETCH_HASHTAGS_SUCCESS,
} from 'src/redux/constants';
import {api} from 'src/constants';

async function getHashtags(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export default function loadHashtags() {
  return async dispatch => {
    try {
      await getHashtags(`${api?.HOST}/${api?.PATH}/hashtags`).then(data => {
        const hashtagsData = data?.data;
        dispatch(fetchHashtagsRequest());
        dispatch(fetchHashtagsSuccess(hashtagsData));
      });
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
