import { IMessageSummary } from '../../interfaces/message';
import { IRelationship } from '../../interfaces/relationship';
import { IUserInfo } from '../../interfaces/user';
import { IChatDetailState } from '../../social/state/chat-detail-selected-reducer';
import { IPublicationExtended } from '../../interfaces/publication';

export interface IState {
  userInfo: IUserInfo;
  friendRequestPending: IRelationship[];
  friends: IUserInfo[];
  chatDetailSelected: IChatDetailState;
  chatList: IMessageSummary[];
  publications: { [id: string]: IPublicationExtended };
}
