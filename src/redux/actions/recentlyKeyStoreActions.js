import {ADD_RECENTLY_KEYSTORE} from '../constants';

export const addRecentlyKeyStore = keyStore => dispatch => {
  return dispatch({
    type: ADD_RECENTLY_KEYSTORE,
    payload: keyStore,
  });
};
