import { IUserInfo } from '../../../interfaces/user';
import { dispatch } from '../../store';
import { update } from '../../store/user-info-reducer';
export const updateUserAction = (user: IUserInfo) => dispatch(update(user));
