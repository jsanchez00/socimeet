import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import { IRelationship } from '../../interfaces/relationship';

const initialState: IRelationship[] = [];

export const friendRequestPendingSlice = createSlice<
  IRelationship[],
  {
    ['update']: CaseReducer<IRelationship[], any>;
    ['acceptRequest']: CaseReducer<IRelationship[], any>;
    ['declineRequest']: CaseReducer<IRelationship[], any>;
  }
>({
  name: 'friendRequestPending',
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
    acceptRequest: (state, action) => {
      state.forEach((r) => {
        if (r.destination === action.payload) r.status = 'done';
      });
      return state;
    },
    declineRequest: (state, action) => {
      state.forEach((r) => {
        if (r.destination === action.payload) r.status = 'rejected';
      });
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, acceptRequest, declineRequest } = friendRequestPendingSlice.actions;

export default friendRequestPendingSlice.reducer;
