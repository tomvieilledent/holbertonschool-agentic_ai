const fs = require('fs/promises');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');
const INTERVAL_MS = 5000;

process.on('unhandledRejection', (reason) => {
  console.error(`UnhandledRejection: ${reason instanceof Error ? reason.message : reason}`);
});

process.on('uncaughtException', (err) => {
  console.error(`UncaughtException: ${err.message}`);
});

async function readTasks() {
  const raw = await fs.readFile(TASKS_FILE, 'utf8');
  const tasks = JSON.parse(raw);

  if (!Array.isArray(tasks)) {
    throw new Error('tasks.json must contain a JSON array.');
  }

  return tasks;
}

function findFirstPendingAction(tasks) {
  const task = tasks.find((t) => t && t.status === 'pending');

  if (!task || typeof task.action !== 'string' || task.action.length === 0) {
    return null;
  }

  return task.action;
}

async function checkTasks() {
  try {
    const tasks = await readTasks();
    const action = findFirstPendingAction(tasks);

    if (action !== null) {
      console.log(action);
    }
  } catch (err) {
    console.error(`tasks.json unreadable or invalid: ${err.message}`);
  }
}

checkTasks();
setInterval(checkTasks, INTERVAL_MS);
