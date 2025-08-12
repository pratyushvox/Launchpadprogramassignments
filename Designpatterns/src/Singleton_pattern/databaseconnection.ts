export class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;

  private constructor() {
    console.log("Connecting to the database...");
  }

  public static getInstance(): DatabaseConnection {
    if (this.instance === null) {
      this.instance = new DatabaseConnection();
    } else {
      console.log("Using existing database connection.");
    }
    return this.instance;
  }

  public query(sql: string) {
    console.log(`Executing query: ${sql}`);
  }
}
