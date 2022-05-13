export type TRelationShipStatus = 'pending' | 'done' | 'rejected';

export interface IRelationship {
  origin: string;
  destination: string;
  status: TRelationShipStatus;
}
