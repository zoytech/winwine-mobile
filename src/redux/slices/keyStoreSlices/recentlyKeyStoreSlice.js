import {removeIdenticalItemInArray} from 'src/utils';

const RECENTLY_KEYSTORE = {
  ADD: 'ADD_RECENTLY_KEYSTORE',
  GET: 'GET_RECENTLY_KEYSTORE',
};
const RECENTLY_KEYSTORE_LIMIT = 10;

const initialState = {
  recentlyKeyStores: [],
};

export const addRecentlyKeyStore = keyStore => dispatch => {
  return dispatch({
    type: RECENTLY_KEYSTORE.ADD,
    payload: keyStore,
  });
};

export function recentlyKeyStoreReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case RECENTLY_KEYSTORE.GET:
      return {...state, recentlyKeyStores: payload};
    case RECENTLY_KEYSTORE.ADD:
      return {
        ...state,
        recentlyKeyStores: [payload, ...state.recentlyKeyStores],
      };
    default:
      return state;
  }
}

export const recentlyKeyStoresSelect = state => {
  const rawKeyStores = state.recentlyKeyStore.recentlyKeyStores;
  const uniqueKeyStores = removeIdenticalItemInArray(rawKeyStores);
  uniqueKeyStores.length > RECENTLY_KEYSTORE_LIMIT
    ? uniqueKeyStores.splice(uniqueKeyStores.length - 1, 1)
    : uniqueKeyStores;
  return uniqueKeyStores;
};
