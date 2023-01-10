import {select} from 'src/utils';
import {LIBRARY_KEYSTORE_LIMIT} from '../configs';

const LIBRARY_KEYSTORE = {
  ADD: 'ADD_LIBRARY_KEYSTORE',
  GET: 'GET_LIBRARY_KEYSTORE',
  REMOVE: 'REMOVE_LIBRARY_KEYSTORE',
};
const initialState = {
  libraryKeyStores: [],
};
export const addLibraryKeyStore = keyStore => dispatch =>
  dispatch({
    type: LIBRARY_KEYSTORE.ADD,
    payload: keyStore,
  });
export const removeLibraryKeyStore = keyStore => dispatch =>
  dispatch({
    type: LIBRARY_KEYSTORE.REMOVE,
    payload: keyStore,
  });

export function libraryKeyStoreReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case LIBRARY_KEYSTORE.GET:
      return {...state, libraryKeyStores: payload};
    case LIBRARY_KEYSTORE.ADD:
      return {
        ...state,
        libraryKeyStores: [payload, ...state.libraryKeyStores],
      };
    case LIBRARY_KEYSTORE.REMOVE:
      return {
        ...state,
        libraryKeyStores: state.libraryKeyStores.filter(
          item => item !== action.payload,
        ),
      };
    default:
      return state;
  }
}

export const libraryKeyStoreSelect = state =>
  state.libraryKeyStore.libraryKeyStores;