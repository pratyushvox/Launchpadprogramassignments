import * as fs from 'fs';
import type { Todo, LogEntry } from '../types/index';

export function readTodos(): Todo[] {
  try {
    if (!fs.existsSync('data')) {
      fs.mkdirSync('data');
    }
    if (!fs.existsSync('data/todos.json')) {
      fs.writeFileSync('data/todos.json', '[]');
    }
    const data = fs.readFileSync('data/todos.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Error reading todos file');
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    if (!fs.existsSync('data')) {
      fs.mkdirSync('data');
    }
    fs.writeFileSync('data/todos.json', JSON.stringify(todos, null, 2));
  } catch (error) {
    console.log('Error saving todos file');
  }
}

export function readLogs(): LogEntry[] {
  try {
    if (!fs.existsSync('data')) {
      fs.mkdirSync('data');
    }
    if (!fs.existsSync('data/logs.json')) {
      fs.writeFileSync('data/logs.json', '[]');
    }
    const data = fs.readFileSync('data/logs.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Error reading logs file');
    return [];
  }
}

export function saveLogs(logs: LogEntry[]): void {
  try {
    if (!fs.existsSync('data')) {
      fs.mkdirSync('data');
    }
    fs.writeFileSync('data/logs.json', JSON.stringify(logs, null, 2));
  } catch (error) {
    console.log('Error saving logs file');
  }
}