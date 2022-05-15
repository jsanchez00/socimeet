import { notificationSystem } from '../../../app/application/commands/notification-system';
import { customFetch } from '../../../app/infrastructure/fetch';
import { dispatch } from '../../../app/store';
import { IRelationship } from '../../../interfaces/relationship';
import { acceptRequest as acceptRequestA } from '../../state/friend-request-pending-reducer';

export const acceptRequest = (relationship: IRelationship) => {
  customFetch('/relationships/accept', { method: 'POST', body: relationship })
    .then((r) => {
      acceptRequestAction(relationship);
      notificationSystem.success('Sol·licitud acceptada correctament');
    })
    .catch((e) => notificationSystem.error("No s'ha pogut acceptar la sol·licitud"));
};

const acceptRequestAction = (r: IRelationship) => dispatch(acceptRequestA(r.destination));
