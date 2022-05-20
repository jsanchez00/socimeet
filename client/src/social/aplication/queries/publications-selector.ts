import { IState } from '../../../app/domain/state';
export const publicationsSelector = (st: IState) => st?.publications || [];
