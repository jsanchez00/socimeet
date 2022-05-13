import { customFetch } from '../../infrastructure/fetch';
import { updateUserAction } from './update-user-action';

export const signUp = (email: string | undefined, password: string | undefined): Promise<any> =>
  customFetch('users/signup', {
    method: 'POST',
    body: { email, password },
  }).then((r) => {
    updateUserAction(r.user);
    return r;
  });
