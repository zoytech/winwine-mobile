import {normalizedBy, replace, select} from '../../../utils';
import {LIMIT} from '../../../constants';

const CARD_DECKS = {
  ADD: 'ADD_CARD_DECKS',
  GET: 'GET_CARD_DECKS',
};

const initialState = {
  cardDeckIds: [],
  cardDecks: [],
};

export const addStoreCardDecks =
  ({cardDeck, cardDeckId}) =>
  dispatch => {
    return dispatch({
      type: CARD_DECKS.ADD,
      payload: {cardDeck, cardDeckId},
    });
  };
export const removeStoreCardDecks =
  ({cardDeck, cardDeckId}) =>
  dispatch => {
    return dispatch({
      type: CARD_DECKS.REMOVE,
      payload: {cardDeck, cardDeckId},
    });
  };

export function storeCardDecksReducer(state = initialState, action) {
  const {type, payload} = action;
  const {cardDecks: initCardDecks, cardDeckIds: initCardDeckIds} = state;
  switch (type) {
    case CARD_DECKS.ADD:
      return {
        ...state,
        cardDeckIds: [payload?.cardDeckId, ...initCardDeckIds],
        cardDecks: [payload?.cardDeck, ...initCardDecks],
      };
    case CARD_DECKS.REMOVE:
      const cardDeckIndex = initCardDecks.indexOf(payload?.cardDeck);
      const deckIdIndex = initCardDecks.indexOf(payload?.cardDeckId);
      return {
        ...state,
        cardDeckIds: [
          ...initCardDeckIds.slice(0, deckIdIndex),
          ...initCardDeckIds.slice(deckIdIndex + 1),
        ],
        cardDecks: [
          ...initCardDecks.slice(0, cardDeckIndex),
          ...initCardDecks.slice(cardDeckIndex + 1),
        ],
      };
    default:
      return state;
  }
}

export const storeCardDecksSelect = state => state.storeCardDecks.cardDecks;
export const normalizedCardDecksSelect = state =>
  state.storeCardDecks.cardDecks.reduce(normalizedBy('cardDeckId'), {});
export const storeCardDeckIdsSelect = state => {
  const cardDeckIds = state.storeCardDecks.cardDeckIds;
  return select.uniqueElement(cardDeckIds);
};
export const recentlyCardDeckIdsSelect = state => {
  const cardDeckIds = state.storeCardDecks.cardDeckIds;
  const uniqueCardDeckIds = select.uniqueElement(cardDeckIds);
  replace.lastElementWhenExceedLength(
    uniqueCardDeckIds,
    LIMIT.RECENTLY_CARD_DECKS,
  );
  return uniqueCardDeckIds;
};
