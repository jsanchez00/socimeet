import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { customFetch } from '../../../../app/infrastructure/fetch';
import { getState, dispatch } from '../../../../app/store/index';
import { IPublicationLike, TPublicationLike } from '../../../../interfaces/publication';
import { addReaction, removeReaction } from '../../../state/publications-reducer';
import { notificationSystem } from '../../../../app/application/commands/notification-system';

export const deleteReaction = (type: TPublicationLike, publicationId: string) => {
  const reaction: Partial<IPublicationLike> = {
    emailUser: userInfoSelector(getState())?.email,
    publicationId,
    type,
  };
  customFetch('publications/remove-like-publication', { method: 'POST', body: reaction })
    .then((r) => {
      dispatch(removeReaction(reaction));
      return Promise.resolve();
    })
    .catch((e) => {
      notificationSystem.error(e.message || 'Error al reaccionar');
    });
};
