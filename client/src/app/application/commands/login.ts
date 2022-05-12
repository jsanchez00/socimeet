import { customFetch } from '../../infrastructure/fetch';
import { dispatch } from '../../store/index';
import { update } from '../../store/user-info-reducer';
interface ICredentials {
  email: string | undefined;
  password: string | undefined;
}

export const loginUser = async (credentials: ICredentials): Promise<any> =>
  customFetch('users/login', { method: 'POST', body: credentials }).then((r) => {
    dispatch(
      update({
        email: r.user.email,
        name: r.user.email,
      })
    );
    return r;
  });
