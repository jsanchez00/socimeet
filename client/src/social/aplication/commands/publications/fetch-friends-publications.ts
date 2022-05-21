import { customFetch } from '../../../../app/infrastructure/fetch';
import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { dispatch, getState } from '../../../../app/store/index';
import { IPublication, IPublicationExtended } from '../../../../interfaces/publication';
import { update } from '../../../state/publications-reducer';
import { notificationSystem } from '../../../../app/application/commands/notification-system';
export const fetchFriendsPublications = (): Promise<any> => {
  const userEmail = userInfoSelector(getState())?.email;
  return customFetch('publications/get-friends-publications', { method: 'POST', body: { email: userEmail } })
    .then((publications: IPublication[]) => {
      dispatch(update(toDictionary(publications)));
    })
    .catch((e) => {
      notificationSystem.error('Error al recuperar les publicacions');
    });
};

const toDictionary = (items: IPublicationExtended[] | any) =>
  items.reduce((acc: any, curr: IPublicationExtended) => {
    return { ...acc, [curr.id as any]: curr } as any;
  }, {});
