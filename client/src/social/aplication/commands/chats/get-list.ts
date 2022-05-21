import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { customFetch } from '../../../../app/infrastructure/fetch';
import { dispatch, getState } from '../../../../app/store/index';
import { IMessageSummary } from '../../../../interfaces/message';
import { update } from '../../../state/chat-list-reducer';

export const getChatList = (email: string): Promise<IMessageSummary[]> => {
  return customFetch('chat/get-list', {
    method: 'POST',
    body: {
      email,
    },
  }).then((messages: IMessageSummary[]) => {
    dispatch(update(messages));
    return messages;
  });
};
