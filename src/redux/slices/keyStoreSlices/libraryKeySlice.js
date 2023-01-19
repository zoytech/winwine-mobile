import {select} from 'src/utils';
import {LIBRARY_KEYSTORE_LIMIT} from '../configs';

const LIB_KEYSTORE = {
  ADD: 'ADD_LIB_KEYSTORE',
  REMOVE: 'REMOVE_LIB_KEYSTORE',
};
const initialState = {
  libKeys: [],
};
export const addLibraryKeyStore = keyStore => dispatch =>
  dispatch({
    type: LIB_KEYSTORE.ADD,
    payload: keyStore,
  });
export const removeLibraryKeyStore = keyStore => dispatch =>
  dispatch({
    type: LIB_KEYSTORE.REMOVE,
    payload: keyStore,
  });

export function libraryKeysReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case LIB_KEYSTORE.ADD:
      return {
        ...state,
        libKeys: [...payload],
      };
    case LIB_KEYSTORE.REMOVE:
      const libKeyIndex = state?.libKeys[payload];
      return {
        ...state,
        libKeys: [
          ...state?.libKeys.slice(0, libKeyIndex),
          ...state?.libKeys.slice(libKeyIndex + 1),
        ],
      };
    default:
      return state;
  }
}

export const libraryKeysSelect = state => state.libraryKeys.libKeys;
