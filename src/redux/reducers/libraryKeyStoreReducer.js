import {
  ADD_LIBRARY_KEYSTORE,
  GET_LIBRARY_KEYSTORE,
  REMOVE_LIBRARY_KEYSTORE,
} from 'src/redux/constants';

const initialState = {
  libraryKeyStores: [],
};

function libraryKeyStoreReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_LIBRARY_KEYSTORE:
      return {...state, libraryKeyStores: payload};
    case ADD_LIBRARY_KEYSTORE:
      return {
        ...state,
        libraryKeyStores: [payload, ...state.libraryKeyStores],
      };
    case REMOVE_LIBRARY_KEYSTORE:
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

export {libraryKeyStoreReducer};
