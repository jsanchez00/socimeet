export interface IPublication {
  emailUser: string;
  text: string;
  image?: string;
  date: Date;
}

export interface IPublicationAnswer {
  emailUser: string;
  text: string;
  date: Date;
  publicationId: string;
}

export type TPublicationLike = 'Like' | 'Star' | 'Heart' | 'Dislike';

export interface IPublicationLike {
  emailUser: string;
  type: TPublicationLike;
  date: Date;
}
