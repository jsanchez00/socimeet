import { IUserInfo } from '../../interfaces/user';
import { IRelationship } from '../../interfaces/relationship';

export interface IState {
  userInfo: IUserInfo;
  friendRequestPending: IRelationship[];
}
