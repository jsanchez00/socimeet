import { IEntity } from './entity';

export interface IPublication extends IEntity {
  title: string;
  emailUser: string;
  text: string;
  image?: string;
  date: Date;
}

export interface IPublicationExtended extends IPublication {
  likes: IPublicationLike[];
  answers: IPublicationAnswer[];
}

export interface IPublicationAnswer extends IEntity {
  emailUser: string;
  text: string;
  date: Date;
  publicationId: string;
}

export type TPublicationLike = 'Like' | 'Star' | 'Heart' | 'Dislike';

export interface IPublicationLike extends IEntity {
  emailUser: string;
  type: TPublicationLike;
  date: Date;
  publicationId: string;
}
