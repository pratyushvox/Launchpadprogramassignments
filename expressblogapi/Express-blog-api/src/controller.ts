import { Request, Response } from "express";
import { IBlogPayload } from "./types";
import BlogService from "./service";

const BlogController = {
  
  getAll(req: Request, res: Response) {
    try {
      const blogs = BlogService.getAll();
      res.status(200).json({
        message: "Here are all your amazing blog posts!",
        data: blogs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },

 
  getById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const blog = BlogService.getById(parseInt(id));
      res.status(200).json({
        message: "Blog fetched successfully",
        data: blog,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Blog not found" });
    }
  },

 
  create(req: Request<{}, {}, IBlogPayload>, res: Response) {
    try {
      const body = req.body;
      const newBlog = BlogService.create(body);
      res.status(201).json({
        message: "New blog post published successfully!",
        data: newBlog,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid blog data" });
    }
  },

  
  update(
    req: Request<{ id: string }, {}, Partial<IBlogPayload>>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedBlog = BlogService.updateById(parseInt(id), body);
      res.status(200).json({
        message: "Blog post has been modified!",
        data: updatedBlog,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Blog not found" });
    }
  },


  delete(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      BlogService.deleteById(parseInt(id));
      res.status(200).json({
        message: "Post deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Blog not found" });
    }
  },
};

export default BlogController;