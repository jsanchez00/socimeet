import { IUserInfo } from '../../../interfaces/user';
import { customFetch } from '../../infrastructure/fetch';
import { notificationSystem } from './notification-system';
import { updateUserAction } from './update-user-action';

export const updateUserInfo = (userInfo: IUserInfo): Promise<any> => {
  return customFetch(`/users/update-user`, { method: 'POST', body: userInfo })
    .then((r) => {
      updateUserAction(userInfo);
      notificationSystem.success('Perfil modificat correctament');
      return Promise.resolve();
    })
    .catch((e) => notificationSystem.error('Error al modificar el perfil'));
};
