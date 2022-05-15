import { IState } from '../../../app/domain';

export const friendsRequestSelector = (state: IState) => state?.friendRequestPending;
export const friendsRequestPendingSelector = (state: IState) => state?.friendRequestPending?.filter((r) => r.status === 'pending');
