import BlogStorage from "./storage";
import { IBlogPayload } from "./types";

const BlogService = {
  
  getAll() {
    return BlogStorage.getAll();
  },

  
  getById(id: number) {
    const blog = BlogStorage.getById(id);
    if (!blog) {
      throw new Error("Blog not found");
    }
    return blog;
  },

  
  create(payload: IBlogPayload) {
    
    if (!payload.title || !payload.content || !payload.author) {
      throw new Error("Title, content, and author are required");
    }

    if (payload.title.length === 0) {
      throw new Error("Title cannot be empty");
    }

    if (payload.content.length === 0) {
      throw new Error("Content cannot be empty");
    }

    if (payload.author.length === 0) {
      throw new Error("Author cannot be empty");
    }

    return BlogStorage.create(payload);
  },

  updateById(id: number, payload: Partial<IBlogPayload>) {
    const updatedBlog = BlogStorage.updateById(id, payload);
    if (!updatedBlog) {
      throw new Error("Blog not found");
    }
    return updatedBlog;
  },

  
  deleteById(id: number) {
    const success = BlogStorage.deleteById(id);
    if (!success) {
      throw new Error("Blog not found");
    }
    return true;
  },
};

export default BlogService;