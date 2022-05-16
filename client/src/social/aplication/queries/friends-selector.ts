import { IState } from '../../../app/domain';

export const friendsSelector = (state: IState) => state?.friends;
