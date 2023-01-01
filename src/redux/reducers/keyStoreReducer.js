import {
  ADD_RECENTLY_KEYSTORE,
  GET_RECENTLY_KEYSTORE,
} from 'src/redux/constants';

const initialState = {
  recentlyKeyStores: [],
};

function recentlyKeyStoreReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_RECENTLY_KEYSTORE:
      return {...state, recentlyKeyStores: payload};
    case ADD_RECENTLY_KEYSTORE:
      return {
        ...state,
        recentlyKeyStores: [payload, ...state.recentlyKeyStores],
      };
    default:
      return state;
  }
}


export {recentlyKeyStoreReducer};
