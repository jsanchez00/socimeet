import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { getState } from '../../../../app/store/index';
import { customFetch } from '../../../../app/infrastructure/fetch';
export const removeFriend = (friendEmail: string) => {
  const email = userInfoSelector(getState())?.email;
  customFetch('relationships/remove-friend', {
    method: 'POST',
    body: {
      email,
      friendEmail,
    },
  });
};
