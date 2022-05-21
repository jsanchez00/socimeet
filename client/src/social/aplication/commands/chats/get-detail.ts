import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { customFetch } from '../../../../app/infrastructure/fetch';
import { dispatch, getState } from '../../../../app/store/index';
import { IMessage } from '../../../../interfaces/message';
import { update } from '../../../state/chat-detail-selected-reducer';
import { chatDetailSelector } from '../../queries/chats-selectors';

export const getChatDetail = (friendEmail: string): Promise<IMessage[]> => {
  return customFetch('chat/get-detail', {
    method: 'POST',
    body: {
      firstUser: friendEmail,
      secondUser: userInfoSelector(getState())?.email,
    },
  }).then((messages: IMessage[]) => {
    const chatDetail = chatDetailSelector(getState());
    if (chatDetail?.messages.length != messages.length || !chatDetail?.friend) dispatch(update({ friend: friendEmail, messages }));
    return messages;
  });
};
