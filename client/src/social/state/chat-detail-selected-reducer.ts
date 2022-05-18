import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../interfaces/message';

export interface IChatDetailState {
  friend: string;
  messages: IMessage[];
}

const initialState: IChatDetailState = {
  friend: '',
  messages: [],
};

export const chatDetailSlice = createSlice<
  IChatDetailState,
  {
    ['update']: CaseReducer<IChatDetailState, any>;
  }
>({
  name: 'chatDetailSelected',
  initialState,
  reducers: {
    update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = chatDetailSlice.actions;

export default chatDetailSlice.reducer;
