import { customFetch } from '../../infrastructure/fetch';
export const signUp = (email: string | undefined, password: string | undefined): Promise<any> =>
    customFetch("users/signup", {
        method: "POST",
        body: {email, password}
    });