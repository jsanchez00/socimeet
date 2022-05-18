export interface IMessage extends IMessageSummary {
  text: string;
  date: Date;
}

export interface IMessageSummary {
  transmitter: string;
  receiver: string;
}
