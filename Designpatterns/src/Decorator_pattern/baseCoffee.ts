import { Coffee } from "./interfaces";

export class SimpleCoffee implements Coffee {
  cost(): number {
    return 100; 
  }

  description(): string {
    return "Simple coffee";
  }
}