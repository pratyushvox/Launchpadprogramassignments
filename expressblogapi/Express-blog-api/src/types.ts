
export interface IBlog {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}


export interface IBlogPayload {
  title: string;
  content: string;
  author: string;
}