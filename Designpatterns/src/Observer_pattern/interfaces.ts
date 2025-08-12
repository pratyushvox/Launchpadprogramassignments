
export interface INewsSubscriber {
  update(news: string): void;
}


export interface INewsAgency {
  subscribe(subscriber: INewsSubscriber): void;
  unsubscribe(subscriber: INewsSubscriber): void;
  publish(news: string): void;
}