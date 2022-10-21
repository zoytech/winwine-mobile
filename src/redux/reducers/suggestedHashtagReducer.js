import {
  FETCH_SUGGESTED_HASHTAG_ERROR,
  FETCH_SUGGESTED_HASHTAG_REQUEST,
  FETCH_SUGGESTED_HASHTAG_SUCCESS,
} from '../constants/suggestedHashtag';

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: [],
};

function suggestedHashtagReducer(state = initialState, payload) {
  const {type, data, message} = payload;
  switch (type) {
    case FETCH_SUGGESTED_HASHTAG_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_SUGGESTED_HASHTAG_SUCCESS:
      console.log('suggestedHashtagReducer', payload);
      return {
        ...state,
        requesting: false,
        success: true,
        data: data || [],
      };
    case FETCH_SUGGESTED_HASHTAG_ERROR:
      return {
        ...state,
        requesting: false,
        message: message,
      };
    default:
      return state;
  }
}

export default suggestedHashtagReducer;
