import { User } from "./user";

export class UserBuilder {
  private name!: string;      
  private email!: string;     
  private age?: number;       
  private address?: string;   

  setName(name: string): this {
    this.name = name;
    return this; 
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setAge(age: number): this {
    this.age = age;
    return this;
  }

  setAddress(address: string): this {
    this.address = address;
    return this;
  }

  build(): User {
    if (!this.name || !this.email) {
      throw new Error("Name and email are required");
    }
    return new User(this.name, this.email, this.age, this.address);
  }
}