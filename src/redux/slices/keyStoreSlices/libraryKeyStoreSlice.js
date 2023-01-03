import {removeIdenticalItemInArray} from 'src/utils';

const LIBRARY_KEYSTORE_LIMIT = 50;
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

export const libraryKeyStoreSelector = state => {
  const rawKeyStores = state.libraryKeyStore.libraryKeyStores;
  const uniqueKeyStores = removeIdenticalItemInArray(rawKeyStores);
  uniqueKeyStores.length > LIBRARY_KEYSTORE_LIMIT
    ? uniqueKeyStores.splice(uniqueKeyStores.length - 1, 1)
    : uniqueKeyStores;
  return uniqueKeyStores;
};
