import {ADD_RECENTLY_KEYSTORE, GET_RECENTLY_KEYSTORE} from '../constants';

const initialState = {
  keyStores: [],
};

function keyStoreReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_RECENTLY_KEYSTORE:
      return {...state, keyStores: payload};
    case ADD_RECENTLY_KEYSTORE:
      return {
        ...state,
        keyStores: [payload, ...state.keyStores],
      };
    default:
      return state;
  }
}

export default keyStoreReducer;
