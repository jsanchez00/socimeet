import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { getState } from '../../../../app/store/index';
import { customFetch } from '../../../../app/infrastructure/fetch';
import { notificationSystem } from '../../../../app/application/commands/notification-system';
import { getFriends } from './get-friends';
export const removeFriend = (friendEmail: string): Promise<any> => {
  const email = userInfoSelector(getState())?.email;
  return customFetch('relationships/remove-friend', {
    method: 'POST',
    body: {
      email,
      friendEmail,
    },
  })
    .then((r) => {
      notificationSystem.success('Amic eliminat correctament');
      getFriends();
    })
    .catch((e) => notificationSystem.error("No s'ha pogut eliminar l'amic"));
};
