import { SimpleCoffee } from "./baseCoffee";
import { WithMilk, WithSugar, WithWhippedCream } from "./toppings";

// Base coffee
const coffee = new SimpleCoffee();
console.log(`${coffee.description()} : ${coffee.cost()} RS`);

// Decorated coffee
const coffeeWithMilkAndSugar = new WithSugar(new WithMilk(coffee));
console.log(`${coffeeWithMilkAndSugar.description()} : ${coffeeWithMilkAndSugar.cost()} RS`);

// Fully loaded coffee
const fancyCoffee = new WithWhippedCream(
  new WithMilk(
    new WithSugar(
      new SimpleCoffee()
    )
  )
);
console.log(`${fancyCoffee.description()} : ${fancyCoffee.cost()} RS`);