import { combineReducers, configureStore, Dispatch, Store } from '@reduxjs/toolkit';
import { IState } from '../domain';
import userInfoReducer from './user-info-reducer';
import friendRequestPendingReducer from '../../social/state/friend-request-pending-reducer';
import friendsReducer from '../../social/state/friends-reducer';
import chatDetailSelectedReducer from '../../social/state/chat-detail-selected-reducer';
import chatListReducer from '../../social/state/chat-list-reducer';
import publicationsReducer from '../../social/state/publications-reducer';

export let store: Store;
const reducer = combineReducers({
  userInfo: userInfoReducer,
  friendRequestPending: friendRequestPendingReducer,
  friends: friendsReducer,
  chatDetailSelected: chatDetailSelectedReducer,
  chatList: chatListReducer,
  publications: publicationsReducer,
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
