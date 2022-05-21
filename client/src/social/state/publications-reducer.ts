import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import { IPublicationExtended } from '../../interfaces/publication';

interface ICurrentState {
  [id: string]: IPublicationExtended;
}

const initialState: ICurrentState = {};

export const publicationsSlice = createSlice<
  ICurrentState,
  {
    ['update']: CaseReducer<ICurrentState, any>;
    ['add']: CaseReducer<ICurrentState, any>;
    ['addAnswer']: CaseReducer<ICurrentState, any>;
    ['addReaction']: CaseReducer<ICurrentState, any>;
    ['removeReaction']: CaseReducer<ICurrentState, any>;
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
      const id = action.payload.id;
      state[id] = action.payload;
      return state;
    },
    addAnswer: (state, action) => {
      const id = action.payload.publicationId;
      if (!state[id]?.answers) {
        state[id].answers = [];
      }

      state[id].answers.push(action.payload);
      return state;
    },
    addReaction: (state, action) => {
      const id = action.payload.publicationId;
      if (!state[id]?.likes) {
        state[id].answers = [];
      }
      state[id].likes.push(action.payload);
      return state;
    },
    removeReaction: (state, action) => {
      const id = action.payload.publicationId;
      const idxToRemove = state[id].likes.findIndex((l) => l.type === action.payload.type && l.emailUser === action.payload.emailUser);
      state[id].likes.splice(idxToRemove, 1);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, add, addAnswer, addReaction, removeReaction } = publicationsSlice.actions;

export default publicationsSlice.reducer;
