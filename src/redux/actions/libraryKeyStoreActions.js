import {ADD_LIBRARY_KEYSTORE, REMOVE_LIBRARY_KEYSTORE} from '../constants';

export const addLibraryKeyStore = keyStore => dispatch =>
  dispatch({
    type: ADD_LIBRARY_KEYSTORE,
    payload: keyStore,
  });
export const removeLibraryKeyStore = keyStore => dispatch =>
  dispatch({
    type: REMOVE_LIBRARY_KEYSTORE,
    payload: keyStore,
  });
