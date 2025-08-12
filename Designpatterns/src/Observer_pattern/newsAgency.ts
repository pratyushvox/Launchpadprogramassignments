import { INewsAgency, INewsSubscriber } from "./interfaces";

export class NewsAgency implements INewsAgency {
  private subscribers: INewsSubscriber[] = [];
  private latestNews: string = "";

  subscribe(subscriber: INewsSubscriber): void {
    const exists = this.subscribers.includes(subscriber);
    if (!exists) {
      this.subscribers.push(subscriber);
      console.log(`Subscriber added. Total: ${this.subscribers.length}`);
    }
  }

  unsubscribe(subscriber: INewsSubscriber): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
      console.log(`Subscriber removed. Total: ${this.subscribers.length}`);
    }
  }

  publish(news: string): void {
    this.latestNews = news;
    console.log(`\nPublishing: "${news}"`);
    this.notifySubscribers();
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(subscriber => 
      subscriber.update(this.latestNews)
    );
  }
}