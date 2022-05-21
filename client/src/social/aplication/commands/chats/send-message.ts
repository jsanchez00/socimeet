import { customFetch } from '../../../../app/infrastructure/fetch';
import { IMessage } from '../../../../interfaces/message';
import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { getState, dispatch } from '../../../../app/store/index';
import { update } from '../../../state/chat-detail-selected-reducer';
import { chatDetailSelector } from '../../queries/chats-selectors';
import { clone } from 'ramda';

export const sendMessage = (text: string, receiver: string): Promise<any> => {
  return customFetch('chat/send-message', {
    method: 'POST',
    body: <Partial<IMessage>>{
      receiver,
      text,
      transmitter: userInfoSelector(getState())?.email,
    },
  }).then((r) => {
    let messages = clone(chatDetailSelector(getState())?.messages);
    messages.push(r);
    dispatch(update({ friend: receiver, messages }));
    return Promise.resolve();
  });
};
