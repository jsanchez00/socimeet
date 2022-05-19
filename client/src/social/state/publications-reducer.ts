import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import { IPublication } from '../../interfaces/publication';

const initialState: IPublication[] = [];

export const publicationsSlice = createSlice<
  IPublication[],
  {
    ['update']: CaseReducer<IPublication[], any>;
    ['add']: CaseReducer<IPublication[], any>;
  }
>({
  name: 'publications',
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
    add: (state, action) => {
      state.push(action.payload);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, add } = publicationsSlice.actions;

export default publicationsSlice.reducer;
