import {CardDeckApi} from 'src/apis';

const CARD_DECKS = {
  ADD_DETAIL: 'ADD_DETAIL',
  UPDATE_DETAIL: 'UPDATE_DETAIL',
  ADD_ALL_SUCCESS: 'ADD_ALL_SUCCESS',
  ADD_ALL_ERROR: 'ADD_ALL_ERROR',
  ADD_ALL_REQUEST: 'ADD_ALL_REQUEST',
};

function loadCardDecksFromApi() {
  return async dispatch => {
    dispatch({type: CARD_DECKS.ADD_ALL_REQUEST});
    try {
      const response = await CardDeckApi.getCardDecks();
      dispatch(loadAllCardDeckSuccess({cardDecks: response?.data}));
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
      const prevCardDeck = selectCardDeckById(getState(), cardDeck?.cardDeckId);
      console.log('prevCardDeckId:', prevCardDeck?.cardDeckId);
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

function loadAllCardDeckSuccess({cardDecks}) {
  return {type: CARD_DECKS.ADD_ALL_SUCCESS, payload: {cardDecks}};
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
      let newCardDeckIds = [...cardDeckIds];
      let newCardDecks = {...cardDecks};

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
      const newCardDeck = action?.payload?.cardDeck;
      const newCardDeckId = newCardDeck?.cardDeckId;

      let newCardDeckIds = [...cardDeckIds];
      if (!cardDeckIds.includes(newCardDeckId)) {
        newCardDeckIds.push(newCardDeckId);
      }
      return {
        ...state,
        cardDeckIds: newCardDeckIds,
        cardDecks: {
          ...cardDecks,
          [newCardDeckId]: {
            ...(cardDecks[newCardDeckId] || {}),
            ...newCardDeck,
            detailed: true,
          },
        },
      };
    }

    case CARD_DECKS.UPDATE_DETAIL: {
      const updatingCardDeck = action.payload?.cardDeck || {};
      const updatingCardDeckId = updatingCardDeck?.cardDeckId;
      return {
        ...state,
        cardDecks: {
          ...cardDecks,
          [updatingCardDeckId]: {
            ...cardDecks[updatingCardDeckId],
            ...updatingCardDeck,
            detailed: true,
          },
        },
      };
    }

    case CARD_DECKS.REMOVE: {
      const removingCardDeck = action.payload;
      const removingCardDeckIndex = cardDecks.indexOf(
        removingCardDeck?.cardDeckId,
      );
      return {
        ...state,
        cardDeckIds: [
          ...cardDeckIds.slice(0, removingCardDeckIndex),
          ...cardDeckIds.slice(removingCardDeckIndex + 1),
        ],
        cardDecks: {
          ...cardDecks,
          [removingCardDeck?.cardDeckId]: undefined,
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
  const {cardDecks = [], cardDeckIds = []} = state?.cardDecks;
  return cardDeckIds.map(id => {
    return cardDecks[id];
  });
}

function selectCardDeckById(state, cardDeckId) {
  const {cardDecks = {}} = state?.cardDecks;
  return cardDecks && cardDecks[cardDeckId];
}

function selectCardDeckByIds(state, cardDeckIds) {
  const {cardDecks = {}} = state?.cardDecks;
  return (
    cardDeckIds &&
    cardDeckIds.length > 0 &&
    cardDeckIds.map(cardDeckId => cardDecks && cardDecks[cardDeckId])
  );
}

function selectCardDecksStore(state) {
  return state?.cardDecks || {};
}

export {
  cardDecksReducer,
  loadCardDecksFromApi,
  upsertCardDeckDetail,
  normalizedCardDecksSelect,
  loadAllCardDeckSuccess,
  selectGetAllCardDeckRequest,
  selectCardDeckArray,
  selectCardDeckById,
  selectCardDecksStore,
  selectCardDeckByIds,
};
