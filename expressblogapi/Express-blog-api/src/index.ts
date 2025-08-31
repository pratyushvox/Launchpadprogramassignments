import express, { Request, Response } from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes";


dotenv.config();


const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.json());


app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running perfectly!",
  });
});


app.use("/api/blogs", blogRoutes);


app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ 
    message: "Route not found" 
  });
});

app.listen(PORT, () => {
  console.log(` Blog API running on http://localhost:${PORT}`);
});