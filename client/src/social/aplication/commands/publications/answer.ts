import { IPublication, IPublicationAnswer } from '../../../../interfaces/publication';
import { customFetch } from '../../../../app/infrastructure/fetch';
import { dispatch, getState } from '../../../../app/store/index';
import { add, addAnswer } from '../../../state/publications-reducer';
import { notificationSystem } from '../../../../app/application/commands/notification-system';
import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';

export const answerPublication = (text: string, publicationId: string): Promise<any> => {
  const answer: Partial<IPublicationAnswer> = {
    emailUser: userInfoSelector(getState())?.email,
    publicationId,
    text,
  };
  return customFetch('publications/answer-publication', { method: 'POST', body: answer })
    .then((r: IPublicationAnswer) => {
      dispatch(addAnswer(r));
      return Promise.resolve();
    })
    .catch((e) => notificationSystem.error(e.message || "No s'ha pogut crear la resposta"));
};
