import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface TokenState {
  token: string;
}

const initialState: TokenState = {token: ''};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const getBusList = (state: RootState) => state.token;

export const { addToken } = tokenSlice.actions;

export default tokenSlice.reducer;
