import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../../interfaces/user';

const initialState = {
  id: '',
  email: '',
  password: '',
};

export const userInfoSlice = createSlice<
  IUserInfo,
  {
    ['update']: CaseReducer<IUserInfo, any>;
    ['reset']: CaseReducer<IUserInfo>;
  }
>({
  name: 'userInfo',
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
    reset: (state) => {
      state = initialState;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset, update } = userInfoSlice.actions;

export default userInfoSlice.reducer;
