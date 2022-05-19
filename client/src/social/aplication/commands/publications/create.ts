import { IPublication } from '../../../../interfaces/publication';
import { customFetch } from '../../../../app/infrastructure/fetch';
import { dispatch, getState } from '../../../../app/store/index';
import { add } from '../../../state/publications-reducer';
import { notificationSystem } from '../../../../app/application/commands/notification-system';
import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';

export const createPublication = (text: string, image?: string): Promise<any> => {
  const publication: Partial<IPublication> = {
    emailUser: userInfoSelector(getState())?.email,
    image,
    text,
  };
  return customFetch('publications/create', { method: 'POST', body: publication })
    .then((r: IPublication) => {
      dispatch(add(r));
      return Promise.resolve();
    })
    .catch((e) => notificationSystem.error(e.message || "No s'ha pogut crear la publicació"));
};
