import type { Todo } from '../types/index';
import { readTodos, saveTodos } from '../utils/fileUtils';
import { generateId, getCurrentTime } from '../utils/helpers';
import { createLog } from './logService';

export function createTodo(title: string): Todo {
  const todos = readTodos();
  const now = getCurrentTime();
  
  const newTodo: Todo = {
    id: generateId(),
    title: title,
    done: false,
    createdAt: now,
    updatedAt: now
  };

  todos.push(newTodo);
  saveTodos(todos);
  createLog('add', newTodo.id, `Added task: ${title}`);
  
  return newTodo;
}

export function getTodos(): Todo[] {
  const todos = readTodos();
  createLog('list', null, `Listed ${todos.length} tasks`);
  return todos;
}

export function findTodoById(id: string): Todo | null {
  const todos = readTodos();
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      return todos[i];
    }
  }
  return null;
}

export function updateTodoTitle(id: string, newTitle: string): Todo | null {
  const todos = readTodos();
  
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      const oldTitle = todos[i].title;
      todos[i].title = newTitle;
      todos[i].updatedAt = getCurrentTime();
      
      saveTodos(todos);
      createLog('update', id, `Updated task from "${oldTitle}" to "${newTitle}"`);
      return todos[i];
    }
  }
  
  return null;
}

export function toggleTodoStatus(id: string): Todo | null {
  const todos = readTodos();
  
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].done = !todos[i].done;
      todos[i].updatedAt = getCurrentTime();
      
      const status = todos[i].done ? 'completed' : 'pending';
      saveTodos(todos);
      createLog('toggle', id, `Marked task as ${status}`);
      return todos[i];
    }
  }
  
  return null;
}

export function deleteTodo(id: string): boolean {
  const todos = readTodos();
  
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      const taskTitle = todos[i].title;
      todos.splice(i, 1);
      
      saveTodos(todos);
      createLog('remove', id, `Deleted task: ${taskTitle}`);
      return true;
    }
  }
  
  return false;
}

export function clearAllTodos(onlyCompleted: boolean = false): number {
  const todos = readTodos();
  let removedCount = 0;
  
  if (onlyCompleted) {
    const remainingTodos = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].done) {
        removedCount++;
      } else {
        remainingTodos.push(todos[i]);
      }
    }
    saveTodos(remainingTodos);
    createLog('clear', null, `Cleared ${removedCount} completed tasks`);
  } else {
    removedCount = todos.length;
    saveTodos([]);
    createLog('clear', null, `Cleared all ${removedCount} tasks`);
  }
  
  return removedCount;
}