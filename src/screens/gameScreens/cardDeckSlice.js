import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from 'src/apis';

const initialState = {
  cardDeck: {},
  status: 'idle',
  error: null,
};
export const getCardDeckById = createAsyncThunk(
  'cardDeck/fetchCardDeck',
  async (cardDeckId: number, {rejectWithValue}) => {
    try {
      const responseBody = await API.getCardDeckById(cardDeckId);
      console.log('responseBody: ', responseBody);
      return responseBody;
    } catch (error) {
      return rejectWithValue(`Opps there seems to be an error. ${error}`);
    }
  },
);
const cardDeckSlice = createSlice({
  name: 'cardDeck',
  initialState,
  reducers: {},
  extraReducers: {
    [getCardDeckById.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getCardDeckById.fulfilled]: (state, {payload}) => {
      console.log('payload: ', payload);
      state.status = 'succeeded';
      state.cardDeck = payload;
    },
    [getCardDeckById.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});

export const cardDeckReducer = cardDeckSlice.reducer;

export const selectCardDeck = state => state.cardDeck;

export const selectCardDeckById = (state, deckId) =>
  state.cardDeck.cardDeck.find(deck => deck.cardDeckId === deckId);
