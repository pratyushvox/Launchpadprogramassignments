import { NewsAgency } from "./newsAgency";
import { NewsChannel } from "./newsChannel";

// Create publisher
const reuters = new NewsAgency();

// Create subscribers
const bbc = new NewsChannel("BBC");
const cnn = new NewsChannel("CNN");
const nepaliTimes = new NewsChannel("Nepali Times");

// Subscribe channels
reuters.subscribe(bbc);
reuters.subscribe(cnn);
reuters.subscribe(nepaliTimes);

// Publish news
reuters.publish("Nepal wins ICC Trophy!");

// Unsubscribe one
reuters.unsubscribe(cnn);

// Publish again
reuters.publish("New Himalayan species discovered");