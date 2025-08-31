import { Router } from "express";
import BlogController from "./controller";

const router = Router();

// Define all blog routes
router.get("/", BlogController.getAll);        
router.get("/:id", BlogController.getById);    
router.post("/", BlogController.create);       
router.patch("/:id", BlogController.update);   
router.delete("/:id", BlogController.delete);  

export default router;