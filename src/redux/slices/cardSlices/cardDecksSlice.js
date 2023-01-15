import {CardDeckApi} from 'src/apis';

const CARD_DECKS = {
  ADD: 'ADD_CARD_DECKS',
  GET: 'GET_CARD_DECKS',
  ADD_ALL_SUCCESS: 'ADD_ALL_SUCCESS',
  ADD_ALL_ERROR: 'ADD_ALL_ERROR',
  ADD_ALL_REQUEST: 'ADD_ALL_REQUEST',
};

function loadCardDecks() {
  return async dispatch => {
    dispatch({type: CARD_DECKS.ADD_ALL_REQUEST});
    try {
      const response = await CardDeckApi.getCardDecks();
      dispatch({
        type: CARD_DECKS.ADD_ALL_SUCCESS,
        payload: {cardDecks: response?.data},
      });
    } catch (error) {
      console.log('loadCardDecks error:', error);
      dispatch({
        type: CARD_DECKS.ADD_ALL_ERROR,
        payload: {error},
      });
    }
  };
}

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

export function cardDecksReducer(
  state = {
    cardDeckIds: [],
    cardDecks: {},
    isRequestingAll: false,
  },
  action,
) {
  const {cardDecks, cardDeckIds} = state;
  switch (action?.type) {
    case CARD_DECKS.ADD_ALL_REQUEST: {
      return {
        ...state,
        isRequestingAll: true,
      };
    }
    case CARD_DECKS.ADD_ALL_ERROR: {
      return {
        ...state,
        isRequestingAll: false,
      };
    }
    case CARD_DECKS.ADD_ALL_SUCCESS: {
      let newCardDeckIds = [];
      let newCardDecks = {};

      action.payload?.cardDecks &&
        action.payload?.cardDecks.forEach(cardDeck => {
          newCardDeckIds.push(cardDeck?.cardDeckId);
          newCardDecks[cardDeck?.cardDeckId] = cardDeck;
        });

      return {
        ...state,
        cardDeckIds: newCardDeckIds,
        cardDecks: newCardDecks,
        isRequestingAll: false,
      };
    }

    case CARD_DECKS.ADD: {
      const newCardDeck = action.payload;
      if (cardDeckIds && cardDeckIds.includes(newCardDeck?.cardDeckId)) {
        return state;
      }
      return {
        ...state,
        cardDeckIds: [newCardDeck?.cardDeckId, ...cardDeckIds],
        cardDecks: {
          ...cardDecks,
          [newCardDeck?.cardDeckId]: newCardDeck,
        },
      };
    }
    case CARD_DECKS.REMOVE: {
      const removingCardeck = action.payload;
      const removingCardDeckIndex = cardDecks.indexOf(
        removingCardeck?.cardDeckId,
      );
      return {
        ...state,
        cardDeckIds: [
          ...cardDeckIds.slice(0, removingCardDeckIndex),
          ...cardDeckIds.slice(removingCardDeckIndex + 1),
        ],
        cardDecks: {
          ...cardDecks,
          [removingCardeck?.cardDeckId]: undefined,
        },
      };
    }
    default:
      return state;
  }
}

const normalizedCardDecksSelect = state => {};

function selectGetAllCardDeckRequest(state) {
  return state?.cardDecks?.isRequestingAll;
}

function selectCardDeckArray(state) {
  const {cardDecks = [], cardDeckIds = {}} = state?.cardDecks;
  return cardDeckIds.map(id => {
    return cardDecks[id];
  });
}

export {
  loadCardDecks,
  normalizedCardDecksSelect,
  selectGetAllCardDeckRequest,
  selectCardDeckArray,
};
