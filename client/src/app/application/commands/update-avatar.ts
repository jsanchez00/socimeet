import axios from 'axios';
import { getState } from '../../store';
import { userInfoSelector } from '../queries/user-info-selector';
import { updateUserAction } from './update-user-action';
import { notificationSystem } from './notification-system';

export const updateAvatar = (files: any) => {
  if (files) {
    const userInfo = userInfoSelector(getState());
    const formData = new FormData();
    formData.append('profileImg', files[0]);
    formData.append('email', userInfo.email);
    axios
      .post('/api/users/update-avatar', formData)
      .then((r: any) => {
        updateUserAction({
          ...userInfo,
          avatar: r.data.avatar,
        });
      })
      .catch((e) => notificationSystem.error('Error al pujar la imatge, no pot superar els 8MB'));
  }
};
