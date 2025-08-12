export class User {
  constructor(
    public readonly name: string,     
    public readonly email: string,    
    public readonly age?: number,     
    public readonly address?: string  
  ) {}
}
