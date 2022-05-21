import { IState } from '../../../app/domain/state';
import { createSelector } from 'reselect';
export const publicationsSelector = (st: IState) => st?.publications || {};
export const publicationIdsSelector = createSelector(publicationsSelector, (st) => Object.keys(st));
export const findPublicationSelector = (id: string) =>
  createSelector(publicationsSelector, (st) => {
    /* console.log('findPublicationSelector');
    console.log(id);
    console.log('****************'); */
    return st[id];
  });
