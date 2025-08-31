import { IBlog, IBlogPayload } from "./types";


let BLOGS: IBlog[] = [];

const BlogStorage = {
  
  getNextId(): number {
    return BLOGS.length + 1;
  },

  create(payload: IBlogPayload): IBlog {
    const newBlog: IBlog = {
      ...payload,
      id: this.getNextId(),
      createdAt: new Date().toISOString(),
    };
    BLOGS.push(newBlog);
    return newBlog;
  },

  
  getAll(): IBlog[] {
    return BLOGS;
  },

  
  getById(id: number): IBlog | undefined {
    return BLOGS.find((blog) => blog.id === id);
  },


  updateById(id: number, payload: Partial<IBlogPayload>): IBlog | undefined {
    const blog = this.getById(id);
    if (!blog) return undefined;

    const updatedBlog: IBlog = {
      ...blog,
      ...payload,
    };
    
    BLOGS = BLOGS.map((blog) => (blog.id === id ? updatedBlog : blog));
    return updatedBlog;
  },

  
  deleteById(id: number): boolean {
    const blog = this.getById(id);
    if (!blog) return false;
    
    BLOGS = BLOGS.filter((blog) => blog.id !== id);
    return true;
  },
};

export default BlogStorage;