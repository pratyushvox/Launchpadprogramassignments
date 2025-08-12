import { DatabaseConnection } from "./databaseconnection";

const db1 = DatabaseConnection.getInstance();
db1.query("SELECT * FROM users");

const db2 = DatabaseConnection.getInstance();
db2.query("SELECT * FROM orders");

console.log("Are both the same?", db1 === db2);
