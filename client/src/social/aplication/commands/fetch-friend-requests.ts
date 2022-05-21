import { userInfoSelector } from '../../../app/application/queries/user-info-selector';
import { customFetch } from '../../../app/infrastructure/fetch';
import { dispatch, getState } from '../../../app/store/index';
import { IRelationship } from '../../../interfaces/relationship';
import { update } from '../../state/friend-request-pending-reducer';

export const fetchFriendsRequests = () => {
  const userInfo = userInfoSelector(getState());
  customFetch('relationships/get-requests', {
    method: 'POST',
    body: {
      email: userInfo.email,
    },
  }).then(updateFriendRequestPending);
};

const updateFriendRequestPending = (r: IRelationship[]) => dispatch(update(r));
