import { combineReducers, configureStore, Dispatch, Store } from '@reduxjs/toolkit';
import { IState } from '../domain';
import userInfoReducer from './user-info-reducer';
import friendRequestPendingReducer from '../../social/state/friend-request-pending-reducer';

export let store: Store;
const reducer = combineReducers({
  userInfo: userInfoReducer,
  friendRequestPending: friendRequestPendingReducer,
});

const initializeStore = () => {
  store = configureStore({
    reducer,
  });
  return store;
};

store = initializeStore();

export const getState: () => IState = store.getState.bind(store);
export const dispatch: Dispatch = store.dispatch.bind(store);

export const injectReducer = (name: string, reducer: any) => {
  reducer[name] = reducer;
  store.replaceReducer(reducer);
};
