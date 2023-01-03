import {HashtagApi} from 'src/apis';

const FETCH_HASHTAGS = {
  ERROR: 'FETCH_HASHTAGS_ERROR',
  REQUEST: 'FETCH_HASHTAGS_REQUEST',
  SUCCESS: 'FETCH_HASHTAGS_SUCCESS',
};
const initialState = {
  requesting: false,
  data: [],
  error: {},
};

export function loadHashtags() {
  return async dispatch => {
    try {
      const response = await HashtagApi.getHashtags();
      const hashtagsData = response?.data;
      dispatch(fetchHashtagsRequest());
      dispatch(fetchHashtagsSuccess(hashtagsData));
    } catch (error) {
      dispatch(fetchHashtagsError(error));
    }
  };
}

const fetchHashtagsRequest = () => ({
  type: FETCH_HASHTAGS.REQUEST,
});
const fetchHashtagsSuccess = data => {
  return {
    type: FETCH_HASHTAGS.SUCCESS,
    payload: {data},
  };
};
const fetchHashtagsError = err => ({
  type: FETCH_HASHTAGS.ERROR,
  payload: {err},
});

export function hashtagsReducer(state = initialState, action) {
  const {type, payload, message} = action;

  switch (type) {
    case FETCH_HASHTAGS.REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_HASHTAGS.SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload?.data || [],
      };
    case FETCH_HASHTAGS.ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export const hashtagsSelect = state => state.hashtags.data;
export const requestHashtagsSelect = state => state.hashtags.requesting;
