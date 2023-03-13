import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CardApi} from '../../../apis';

const PREFIX = 'cardDeckAndCards';

const END_POINT = 'getByCardDeckId';

const initialState = {
  // entities: {cardDeck: {}, cards: []},
  entities: [],
  requesting: false,
  error: {},
};

export const getCardDeckAndCardsById = createAsyncThunk(
  `${PREFIX}/${END_POINT}`,
  async (cardDeckId, {rejectWithValue, dispatch}) => {
    try {
      const getCardsResp = await CardApi.getCardsByCardDeckId(cardDeckId);
      return getCardsResp.data;
      // const [getCardDeckResp, getCardsResp] = await Promise.all([
      //   CardDeckApi.getCardDeckById(cardDeckId),
      //   CardApi.getCardsByCardDeckId(cardDeckId),
      // ]);
      // const cardDeck = getCardDeckResp?.data;
      // const cards = getCardsResp?.data;
      // const storageKey = `${KEY?.RECENTLY_PLAY}/${cardDeckId}`;
      // await AsyncStorage.setItem(storageKey, JSON.stringify(cardDeck));
      // dispatch(addRecentlyKeyStore(storageKey));
      // return {cardDeck, cards};
    } catch (error) {
      return rejectWithValue(`Opps there seems to be an error. ${error}`);
    }
  },
);
const cardDeckAndCardsSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: {
    [getCardDeckAndCardsById.pending]: state => {
      state.requesting = true;
    },
    [getCardDeckAndCardsById.fulfilled]: (state, action) => {
      console.log('payload: ', action?.payload);
      state.requesting = false;
      // state.entities.cardDeck = payload?.cardDeck;
      // state.entities.cards = payload?.cards;
      state.entities = action?.payload || [];
    },
    [getCardDeckAndCardsById.rejected]: state => {
      state.requesting = false;
    },
  },
});

export const cardDeckAndCardsReducer = cardDeckAndCardsSlice.reducers;

export const selectCards = state => state.cardDeckAndCardsV2?.entities;

export const selectRequestCardDeckAndCards = state => state.requesting;
