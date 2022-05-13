import { customFetch } from '../../../app/infrastructure/fetch';
import { IRelationship } from '../../../interfaces/relationship';
import { notificationSystem } from '../../../app/application/commands/notification-system';
export const sendFriendRequest = (origin: string, destination: string) =>
  customFetch('relationships/send-request', {
    method: 'POST',
    body: {
      destination,
      origin,
      status: 'pending',
    } as IRelationship,
  })
    .then((r) => notificationSystem.success('Sol·licitud enviada correctament'))
    .catch((e) => {
      notificationSystem.error('Error al enviar la sol·licitud');
      return Promise.reject();
    });
