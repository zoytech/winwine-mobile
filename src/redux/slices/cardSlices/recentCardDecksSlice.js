import {replace, select, remove} from 'src/utils';
import processingRecentlyData from '../../../screens/homeScreen/processingRecentlyData';

const RECENTLY_CARD_DECKS_ACTION_TYPE = {
  ADD_ALL: '@recentCardDecksReducer/ADD_ALL',
  ADD: '@recentCardDecksReducer/ADD_CARD_DECKS',
  REMOVE: '@recentCardDecksReducer/REMOVE_CARD_DECKS',
};

function addAllRecentlyCardDeckIds(cardDeckIds) {
  return {
    type: RECENTLY_CARD_DECKS_ACTION_TYPE.ADD_ALL,
    payload: {cardDeckIds},
  };
}

function recentCardDecksReducer(
  state = {
    recentlyCardDeckIds: [],
  },
  action,
) {
  const {recentlyCardDeckIds = []} = state;
  const {cardDeckId} = action?.payload;
  switch (action?.type) {
    case RECENTLY_CARD_DECKS_ACTION_TYPE.ADD_ALL: {
      return {
        ...state,
        recentlyCardDeckIds: action?.payload?.cardDeckIds,
      };
    }

    case RECENTLY_CARD_DECKS_ACTION_TYPE.ADD: {
      let newRecentlyCardDeckIds = [...recentlyCardDeckIds];
      newRecentlyCardDeckIds.unshift(cardDeckId);
      return {
        ...state,
        recentlyCardDeckIds: processingRecentlyData(recentlyCardDeckIds),
      };
    }
    case RECENTLY_CARD_DECKS_ACTION_TYPE.REMOVE: {
      return {
        ...state,
        recentlyCardDeckIds: [
          ...remove.elementAtMiddle(recentlyCardDeckIds, cardDeckId),
        ],
      };
    }

    default:
      return state;
  }
}

function selectRecentlyCardDeckStore(state) {
  return state?.recentlyCardDecks;
}

function selectRecentlyCardDeckArray(state) {
  const {cardDecks = []} = state?.cardDecks;
  const {recentlyCardDeckIds} = state?.recentlyCardDecks;
  return recentlyCardDeckIds.map(id => {
    return cardDecks[id];
  });
}

export {
  selectRecentlyCardDeckArray,
  selectRecentlyCardDeckStore,
  recentCardDecksReducer,
  addAllRecentlyCardDeckIds,
};
