import {
  FETCH_SUGGESTED_HASHTAG_ERROR,
  FETCH_SUGGESTED_HASHTAG_REQUEST,
  FETCH_SUGGESTED_HASHTAG_SUCCESS,
} from '../constants/suggestedHashtag';

const initialState = {
  requesting: false,
  data: [],
  error: {},
};

function suggestedHashtagReducer(state = initialState, action) {
  const {type, payload, message} = action;
  switch (type) {
    case FETCH_SUGGESTED_HASHTAG_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_SUGGESTED_HASHTAG_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload || [],
      };
    case FETCH_SUGGESTED_HASHTAG_ERROR:
      return {
        ...state,
        requesting: false,
        error: message,
      };
    default:
      return state;
  }
}

export default suggestedHashtagReducer;
