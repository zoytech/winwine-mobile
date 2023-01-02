import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CardApi, CardDeckApi} from '../../../apis';
import {KEY} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'cardDeckAndCards';

const END_POINT = 'getByCardDeckId';

const initialState = {
  entities: {cardDeck: {}, cards: []},
  requesting: false,
  error: {},
};

export const getCardDeckAndCardsById = createAsyncThunk(
  `${PREFIX}/${END_POINT}`,
  async (cardDeckId, {rejectWithValue}) => {
    try {
      const [getCardDeckResp, getCardsResp] = await Promise.all([
        CardDeckApi.getCardDeckById(cardDeckId),
        CardApi.getCardsByCardDeckId(cardDeckId),
      ]);
      const cardDeck = getCardDeckResp?.data;
      const cards = getCardsResp?.data;
      const storageKey = `${KEY?.RECENTLY_PLAY}/${cardDeckId}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(cardDeck));
      // dispatch(addRecentlyKeyStore(storageKey));
      return {cardDeck, cards};
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
      state.loading = true;
    },
    [getCardDeckAndCardsById.fulfilled]: (state, {payload}) => {
      console.log('payload: ', payload);
      state.loading = false;
      state.entities.cardDeck = payload?.cardDeck;
      state.entities.cards = payload?.cards;
    },
    [getCardDeckAndCardsById.rejected]: state => {
      state.loading = false;
    },
  },
});

export const cardDeckAndCardsReducer = cardDeckAndCardsSlice.reducer;

export const selectCardDeck = state => state.cardDeck.cardDeck;
export const selectCards = state => state.cards.cards;
