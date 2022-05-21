import { IState } from '../../../app/domain';

export const chatListSelector = (state: IState) => state?.chatList;
export const chatDetailSelector = (state: IState) => state?.chatDetailSelected;
