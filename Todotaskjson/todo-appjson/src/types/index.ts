interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LogEntry {
  id: string;
  action: string;
  taskId: string | null;
  timestamp: string;
  details: string;
}

export type { Todo, LogEntry };