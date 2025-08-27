import * as readline from 'readline';
import  { createTodo, getTodos, updateTodoTitle, toggleTodoStatus, deleteTodo, clearAllTodos } from '../service/todoService';
import { getAllLogs } from '../service/logService';
import { formatDate } from '../utils/helpers';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askUser(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function displayMenu(): void {
  console.log('\n=== TODO LIST MANAGER ===');
  console.log('1. Add new task');
  console.log('2. View all tasks');
  console.log('3. Update task');
  console.log('4. Toggle task status');
  console.log('5. Delete task');
  console.log('6. Clear tasks');
  console.log('7. View logs');
  console.log('8. Exit');
  console.log('========================');
}

export async function handleAddTask(): Promise<void> {
  const title = await askUser('Enter task title: ');
  if (title.trim()) {
    const task = createTodo(title.trim());
    console.log(`✓ Task added successfully: "${task.title}"`);
  } else {
    console.log('✗ Task title cannot be empty');
  }
}

export async function handleViewTasks(): Promise<void> {
  const tasks = getTodos();
  if (tasks.length === 0) {
    console.log('No tasks found.');
  } else {
    console.log(`\nFound ${tasks.length} task(s):`);
    console.log('----------------------------');
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const status = task.done ? '[✓]' : '[ ]';
      const date = formatDate(task.updatedAt);
      console.log(`${status} ID: ${task.id} | ${task.title} | Updated: ${date}`);
    }
  }
}

export async function handleUpdateTask(): Promise<void> {
  await handleViewTasks();
  const id = await askUser('\nEnter task ID to update: ');
  const newTitle = await askUser('Enter new title: ');
  
  if (id.trim() && newTitle.trim()) {
    const updatedTask = updateTodoTitle(id.trim(), newTitle.trim());
    if (updatedTask) {
      console.log('✓ Task updated successfully');
    } else {
      console.log('✗ Task not found');
    }
  } else {
    console.log('✗ Invalid input');
  }
}

export async function handleToggleTask(): Promise<void> {
  await handleViewTasks();
  const id = await askUser('\nEnter task ID to toggle: ');
  
  if (id.trim()) {
    const task = toggleTodoStatus(id.trim());
    if (task) {
      const status = task.done ? 'completed' : 'pending';
      console.log(`✓ Task marked as ${status}`);
    } else {
      console.log('✗ Task not found');
    }
  } else {
    console.log('✗ Invalid ID');
  }
}

export async function handleDeleteTask(): Promise<void> {
  await handleViewTasks();
  const id = await askUser('\nEnter task ID to delete: ');
  
  if (id.trim()) {
    const success = deleteTodo(id.trim());
    if (success) {
      console.log('✓ Task deleted successfully');
    } else {
      console.log('✗ Task not found');
    }
  } else {
    console.log('✗ Invalid ID');
  }
}

export async function handleClearTasks(): Promise<void> {
  const choice = await askUser('Clear (a)ll tasks or only (c)ompleted tasks? (a/c): ');
  
  if (choice.toLowerCase() === 'a' || choice.toLowerCase() === 'c') {
    const onlyCompleted = choice.toLowerCase() === 'c';
    const count = clearAllTodos(onlyCompleted);
    const type = onlyCompleted ? 'completed' : 'all';
    console.log(`✓ Cleared ${count} ${type} task(s)`);
  } else {
    console.log('✗ Invalid choice');
  }
}

export async function handleViewLogs(): Promise<void> {
  const logs = getAllLogs();
  if (logs.length === 0) {
    console.log('No logs found.');
  } else {
    console.log(`\nFound ${logs.length} log entries:`);
    console.log('--------------------------------');
    for (let i = 0; i < logs.length; i++) {
      const log = logs[i];
      const date = new Date(log.timestamp).toLocaleString();
      console.log(`[${log.action.toUpperCase()}] ${log.details} (${date})`);
    }
  }
}

export async function startApp(): Promise<void> {
  console.log('Welcome to Todo List Manager!');
  
  while (true) {
    displayMenu();
    const choice = await askUser('Enter your choice (1-8): ');
    
    switch (choice.trim()) {
      case '1':
        await handleAddTask();
        break;
      case '2':
        await handleViewTasks();
        break;
      case '3':
        await handleUpdateTask();
        break;
      case '4':
        await handleToggleTask();
        break;
      case '5':
        await handleDeleteTask();
        break;
      case '6':
        await handleClearTasks();
        break;
      case '7':
        await handleViewLogs();
        break;
      case '8':
        console.log('Goodbye!');
        rl.close();
        return;
      default:
        console.log('✗ Invalid choice. Please enter 1-8.');
    }
    
    await askUser('\nPress Enter to continue...');
  }
}