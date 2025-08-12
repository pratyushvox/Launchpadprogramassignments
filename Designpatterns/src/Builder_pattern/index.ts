import { UserBuilder } from "./userbuilder";

// Building a user with all fields
const user1 = new UserBuilder()
  .setName("Pratyush Khadka")
  .setEmail("Pratyushkhadka69@gmail.com")
  .setAge(22)
  .setAddress("Kathmandu")
  .build();

console.log(user1);

// Building with just required fields
const user2 = new UserBuilder()
  .setName("Ritesh Shrestha")
  .setEmail("Ritesh@gmail.com")
  .build();

console.log(user2);


try {
  const user3 = new UserBuilder()
    .setName("Sishir")
    .build();
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error("An unknown error occurred");
  }
}