import { startApp } from './Controllers/todoController';

async function main() {
  try {
    await startApp();
  } catch (error) {
    console.error('Application error:', error);
    process.exit(1);
  }
}

main();