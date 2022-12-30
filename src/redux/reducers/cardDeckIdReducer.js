import {ADD_DECK_ID, GET_DECK_ID} from '../constants';

const initialState = {
  cardDeckIds: [],
};

function cardDeckIdReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_DECK_ID:
      return {...state, cardDeckIds: payload};
    case ADD_DECK_ID:
      return {
        ...state,
        cardDeckIds: [...state.cardDeckIds, payload],
      };
    default:
      return state;
  }
}

export default cardDeckIdReducer;
