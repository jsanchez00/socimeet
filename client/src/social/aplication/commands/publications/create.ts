import { IPublication } from '../../../../interfaces/publication';
import { customFetch } from '../../../../app/infrastructure/fetch';
import { dispatch, getState } from '../../../../app/store/index';
import { add } from '../../../state/publications-reducer';
import { notificationSystem } from '../../../../app/application/commands/notification-system';
import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import axios from 'axios';

export const createPublication = (title: string, text: string, image?: any): Promise<any> => {
  if (!title || !text) {
    notificationSystem.error('Una publicació ha de contenir títol i contingut');
    return Promise.reject();
  }
  const formData = new FormData();
  formData.append('emailUser', userInfoSelector(getState())?.email);
  formData.append('text', text);
  formData.append('title', title);
  if (image) {
    formData.append('publicationImage', image[0]);
  }
  return axios
    .post('/api/publications/create', formData)
    .then((r: any) => {
      dispatch(add(r.data));
      notificationSystem.success('Publicació creada correctament');
      return Promise.resolve();
    })
    .catch((e) => notificationSystem.error(e.message || "No s'ha pogut crear la publicació"));
};
