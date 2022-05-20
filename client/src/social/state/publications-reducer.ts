import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import { IPublicationExtended } from '../../interfaces/publication';

const initialState: IPublicationExtended[] = [];

export const publicationsSlice = createSlice<
  IPublicationExtended[],
  {
    ['update']: CaseReducer<IPublicationExtended[], any>;
    ['add']: CaseReducer<IPublicationExtended[], any>;
    ['addAnswer']: CaseReducer<IPublicationExtended[], any>;
    ['addReaction']: CaseReducer<IPublicationExtended[], any>;
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
    addAnswer: (state, action) => {
      state.forEach((p) => {
        if (p.id === action.payload.publicationId) {
          if (!p.answers) {
            p.answers = [];
          }
          p.answers.push(action.payload);
        }
      });
      return state;
    },
    addReaction: (state, action) => {
      state.forEach((p) => {
        if (p.id === action.payload.publicationId) {
          if (!p.likes) {
            p.likes = [];
          }
          p.likes.push(action.payload);
        }
      });
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, add, addAnswer, addReaction } = publicationsSlice.actions;

export default publicationsSlice.reducer;
