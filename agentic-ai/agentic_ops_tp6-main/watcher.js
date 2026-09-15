const fs = require('fs/promises');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');
const INTERVAL_MS = 5000;

// Global handlers to avoid process crash on unexpected rejections/exceptions
process.on('unhandledRejection', (reason) => {
  const msg = reason instanceof Error ? reason.stack || reason.message : String(reason);
  console.error(`UnhandledRejection: ${msg}`);
});

process.on('uncaughtException', (err) => {
  const msg = err instanceof Error ? err.stack || err.message : String(err);
  console.error(`UncaughtException: ${msg}`);
});

async function readTasksFile() {
  const rawContent = await fs.readFile(TASKS_FILE, 'utf8');
  let tasks;

  try {
    tasks = JSON.parse(rawContent);
  } catch (err) {
    throw new Error('tasks.json is not valid JSON.');
  }

  if (!Array.isArray(tasks)) {
    throw new Error('tasks.json must contain a JSON array.');
  }

  return tasks;
}

function findFirstPendingTask(tasks) {
  return tasks.find((task) => task && typeof task === 'object' && task.status === 'pending');
}

async function runCycle() {
  try {
    const tasks = await readTasksFile();
    const pendingTask = findFirstPendingTask(tasks);

    if (pendingTask && typeof pendingTask.action === 'string' && pendingTask.action.length > 0) {
      console.log(`Action trouvée: ${pendingTask.action}`);
      return;
    }

    console.log('Aucune action disponible: aucune tâche pending.');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Erreur de lecture de tasks.json: ${message}`);
  }
}

runCycle();
setInterval(runCycle, INTERVAL_MS);