import { Coffee } from "./interfaces";

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  abstract cost(): number;
  abstract description(): string;
}


export class WithMilk extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 30;
  }

  description(): string {
    return `${this.coffee.description()}, with milk`;
  }
}

export class WithSugar extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 10;
  }

  description(): string {
    return `${this.coffee.description()}, with sugar`;
  }
}

export class WithWhippedCream extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 50;
  }

  description(): string {
    return `${this.coffee.description()}, with whipped cream`;
  }
}