import { INewsSubscriber } from "./interfaces";

export class NewsChannel implements INewsSubscriber {
  constructor(private readonly name: string) {}

  update(news: string): void {
    console.log(`[${this.name}] Received update: "${news}"`);
  }
}