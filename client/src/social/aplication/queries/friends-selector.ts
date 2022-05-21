import { createSelector } from 'reselect';
import { IState } from '../../../app/domain';

export const friendsSelector = (state: IState) => state?.friends || [];

export const findFriendSelector = (email: string) =>
  createSelector(friendsSelector, (friends) => {
    return friends?.find((f) => f.email === email);
  });
