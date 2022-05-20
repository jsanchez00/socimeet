import { customFetch } from '../../../../app/infrastructure/fetch';
import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { dispatch, getState } from '../../../../app/store/index';
import { IPublication } from '../../../../interfaces/publication';
import { update } from '../../../state/publications-reducer';
import { notificationSystem } from '../../../../app/application/commands/notification-system';
export const fetchFriendsPublications = (): Promise<any> => {
  const userEmail = userInfoSelector(getState())?.email;
  return customFetch('publications/get-friends-publications', { method: 'POST', body: { email: userEmail } })
    .then((publications: IPublication[]) => {
      dispatch(update(publications));
    })
    .catch((e) => {
      notificationSystem.error('Error al recuperar les publicacions');
    });
};
