import {ADD_RECENTLY_KEYSTORE} from '../constants';

export const addRecentlyKeyStore = keyStore => dispatch =>
  dispatch({
    type: ADD_RECENTLY_KEYSTORE,
    payload: keyStore,
  });
