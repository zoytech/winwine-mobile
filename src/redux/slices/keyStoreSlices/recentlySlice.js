import processingRecentlyData from '../../../screens/homeScreen/processingRecentlyData';

const ADD = {
  KEY: 'ADD_RECENTLY_KEY',
  ID: 'ADD_RECENTLY_ID',
  CARD_DECK: 'ADD_CARD_DECK',
};

const initialState = {
  recentlyKeys: [],
  recentlyIds: [],
  recentlyCardDecks: [],
};

export const addRecentlyKeys = keys => dispatch => {
  return dispatch({
    type: ADD.KEY,
    payload: keys,
  });
};
export const addRecentlyId = ids => dispatch => {
  return dispatch({
    type: ADD.ID,
    payload: ids,
  });
};

export const addRecentlyCardDeck = cardDeck => dispatch => {
  return dispatch({
    type: ADD.CARD_DECK,
    payload: cardDeck,
  });
};

export function recentlyReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case ADD.KEY:
      return {
        ...state,
        recentlyKeys: [...payload, ...state?.recentlyKeys],
      };
    case ADD.ID:
      return {
        ...state,
        recentlyIds: [payload, ...state?.recentlyIds],
      };
    case ADD.CARD_DECK:
      return {
        ...state,
        recentlyCardDecks: [payload, ...state?.recentlyCardDecks],
      };
    default:
      return state;
  }
}

export const recentlyKeysSelect = state => {
  const keys = state.recently.recentlyKeys;
  return processingRecentlyData(keys);
};

export const recentlyIdsSelect = state => {
  const ids = state.recently.recentlyIds;
  return processingRecentlyData(ids);
};
export const recentlyCardDecksSelect = state =>
  state.recently.recentlyCardDecks;
