const CARD_DECKS = {
  ADD: 'ADD_CARD_DECKS',
  GET: 'GET_CARD_DECKS',
};

const initialState = {
  cardDecks: [],
};

export const addStoreCardDecks = cardDeck => dispatch => {
  return dispatch({
    type: CARD_DECKS.ADD,
    payload: cardDeck,
  });
};
export const removeStoreCardDecks = cardDeck => dispatch => {
  return dispatch({
    type: CARD_DECKS.REMOVE,
    payload: cardDeck,
  });
};

export function storeCardDecksReducer(state = initialState, action) {
  const {type, payload} = action;
  const defaultCardDecks = state?.cardDecks;
  switch (type) {
    case CARD_DECKS.ADD:
      return {
        ...state,
        cardDecks: [...defaultCardDecks, payload],
      };
    case CARD_DECKS.REMOVE:
      const payloadIndex = defaultCardDecks.indexOf(payload);
      return {
        ...state,
        cardDecks: [
          ...defaultCardDecks.slice(0, payloadIndex),
          ...defaultCardDecks.slice(payloadIndex + 1),
        ],
      };
    default:
      return state;
  }
}

export const storeCardDecksSelect = state => state.storeCardDecks.cardDecks;
