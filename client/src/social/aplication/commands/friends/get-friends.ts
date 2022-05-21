import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { customFetch } from '../../../../app/infrastructure/fetch';
import { dispatch, getState } from '../../../../app/store/index';
import { IUserInfo } from '../../../../interfaces/user';
import { update } from '../../../state/friends-reducer';

export const getFriends = (): Promise<IUserInfo[]> => {
  const email = userInfoSelector(getState())?.email;
  return customFetch(`relationships/get-friends`, { method: 'POST', body: { email } }).then((r: IUserInfo[]) => {
    dispatch(update(r));
    return r;
  });
};
