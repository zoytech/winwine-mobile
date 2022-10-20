import {GET_CARD_DECK} from '../constants';

const initialState = {
  cardDeckItem: {},
};
const cardDeckReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_DECK:
      console.log('action.payload: ', action.payload);
      return {
        ...state,
        cardDeck: action.payload,
      };
    default:
      return state;
  }
};
export default cardDeckReducer;
