import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../../interfaces/user';

const initialState: IUserInfo[] = [];

export const friendsSlice = createSlice<
  IUserInfo[],
  {
    ['update']: CaseReducer<IUserInfo[], any>;
    ['add']: CaseReducer<IUserInfo[], any>;
    ['remove']: CaseReducer<IUserInfo[], any>;
  }
>({
  name: 'friends',
  initialState,
  reducers: {
    update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('reducer friends');
      console.log(action);
      state = action.payload;
      return state;
    },
    add: (state, action) => {
      state.push(action.payload);
      return state;
    },
    remove: (state, action) => {
      const idx = state.findIndex((f) => f.email === action.payload.email);
      state.splice(idx, 1);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, add, remove } = friendsSlice.actions;

export default friendsSlice.reducer;
