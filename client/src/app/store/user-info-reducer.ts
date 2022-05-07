import { CaseReducer, createSlice } from '@reduxjs/toolkit'
import { IUserInfoState } from "../domain"

const initialState = {
    email: "",
    name: ""
};

export const userInfoSlice = createSlice<IUserInfoState, {
    ["update"]: CaseReducer<IUserInfoState, any>,
    ["reset"]: CaseReducer<IUserInfoState>,
}>({
  name: 'userInfo',
  initialState,
  reducers: {
    update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = action.payload;
    },
    reset: (state) => {
        state = initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { reset, update } = userInfoSlice.actions

export default userInfoSlice.reducer