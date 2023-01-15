import {CardDeckApi} from 'src/apis';

const CARD_DECKS = {
  GET: 'GET_CARD_DECKS',
  ADD_DETAIL: 'ADD_DETAIL',
  UPDATE_DETAIL: 'UPDATE_DETAIL',
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

function upsertCardDeckDetail(cardDeck) {
  if (!cardDeck) {
    console.log('upsertCardDeckDetail - invalid cardDeck:', cardDeck);
    return;
  }
  return async (dispatch, getState) => {
    try {
      const prevCardDeck = selectCardDeckById(cardDeck?.cardDeckId, getState());
      if (!prevCardDeck) {
        dispatch({type: CARD_DECKS.ADD_DETAIL, payload: {cardDeck: cardDeck}});
        return;
      }
      dispatch({type: CARD_DECKS.UPDATE_DETAIL, payload: {cardDeck: cardDeck}});
    } catch (error) {
      console.log('upsertCardDeckDetail error:', error);
    }
  };
}

const removeStoreCardDecks = cardDeck => dispatch => {
  return dispatch({
    type: CARD_DECKS.REMOVE,
    payload: cardDeck,
  });
};

function cardDecksReducer(
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
          const id = cardDeck?.cardDeckId;
          if (!cardDeckIds.includes(id)) {
            newCardDeckIds.push(id);
          }
          if (cardDecks && cardDecks[id] && cardDecks[id]?.detailed) {
            newCardDecks[id] = cardDecks[id];
          } else {
            newCardDecks[id] = cardDeck;
          }
        });

      return {
        ...state,
        cardDeckIds: newCardDeckIds,
        cardDecks: newCardDecks,
        isRequestingAll: false,
      };
    }

    case CARD_DECKS.ADD_DETAIL: {
      const newCardDeck = action.payload;
      const id = newCardDeck?.cardDeckId;

      let newCardDeckId = [...cardDeckIds];
      if (!cardDeckIds.includes(id)) {
        newCardDeckId.push(id);
      }
      return {
        ...state,
        cardDeckIds: newCardDeckId,
        cardDecks: {
          ...cardDecks,
          [id]: {
            ...(cardDecks[id] || {}),
            ...newCardDeck,
            detailed: true,
          },
        },
      };
    }

    case CARD_DECKS.UPDATE_DETAIL: {
      const updatingCardDeck = action.payload;
      return {
        ...state,
        cardDeckIds: [updatingCardDeck?.cardDeckId, ...cardDeckIds],
        cardDecks: {
          ...cardDecks,
          [updatingCardDeck?.cardDeckId]: {
            ...cardDecks[updatingCardDeck?.cardDeckId],
            ...updatingCardDeck,
            detailed: true,
          },
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

function selectCardDeckById(cardDeckId, state) {
  const {cardDeckIds = {}} = state?.cardDecks;
  return cardDeckIds && cardDeckIds[cardDeckId];
}

export {
  cardDecksReducer,
  loadCardDecks,
  upsertCardDeckDetail,
  normalizedCardDecksSelect,
  selectGetAllCardDeckRequest,
  selectCardDeckArray,
  selectCardDeckById,
};
