import { LogisticsFactory } from "./LogisticFactory";

const factory = new LogisticsFactory();

// Land delivery
const truck = factory.createTransport("land");
truck.deliver();  

// Sea delivery
const ship = factory.createTransport("sea");
ship.deliver();   

// Air delivery
const plane = factory.createTransport("air");
plane.deliver();  