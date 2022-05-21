import { userInfoSelector } from '../../../app/application/queries/user-info-selector';
import { customFetch } from '../../../app/infrastructure/fetch';
import { dispatch, getState } from '../../../app/store';
import { IRelationship } from '../../../interfaces/relationship';
import { declineRequest as declineRequestA } from '../../state/friend-request-pending-reducer';
import { notificationSystem } from '../../../app/application/commands/notification-system';

export const declineRequest = (relationship: IRelationship) => {
  customFetch('/relationships/decline', { method: 'POST', body: relationship })
    .then((r) => {
      declineRequestAction(relationship);
      notificationSystem.success('Sol·licitud declinada correctament');
    })
    .catch((e) => notificationSystem.error("No s'ha pogut declinar la sol·licitud"));
};

const declineRequestAction = (r: IRelationship) => dispatch(declineRequestA(r.destination));
