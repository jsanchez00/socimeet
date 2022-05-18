import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import { IMessageSummary } from '../../interfaces/message';

const initialState: IMessageSummary[] = [];

export const chatListSlice = createSlice<
  IMessageSummary[],
  {
    ['update']: CaseReducer<IMessageSummary[], any>;
  }
>({
  name: 'chatList',
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
export const { update } = chatListSlice.actions;

export default chatListSlice.reducer;
