import { IState } from '../../domain/state';

export const userInfoSelector = (state: IState) => state?.userInfo;
