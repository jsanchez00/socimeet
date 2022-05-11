import { customFetch } from '../../infrastructure/fetch';
interface ICredentials {
  email: string | undefined;
  password: string | undefined;
}

export const loginUser = async (credentials: ICredentials): Promise<any> => customFetch('users/login', { method: 'POST', body: credentials });
