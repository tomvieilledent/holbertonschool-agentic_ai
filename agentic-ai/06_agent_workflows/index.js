const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');
const INTERVAL_MS = 5000;

function getNextPendingAction(tasks) {
  if (!Array.isArray(tasks)) {
    return null;
  }

  const nextTask = tasks.find((task) => task && task.status === 'pending');

  if (!nextTask) {
    return null;
  }

  if (typeof nextTask.action !== 'string' || nextTask.action.length === 0) {
    return null;
  }

  return nextTask.action;
}

function checkTasks() {
  try {
    const raw = fs.readFileSync(TASKS_FILE, 'utf8');
    const tasks = JSON.parse(raw);
    const action = getNextPendingAction(tasks);

    if (action !== null) {
      console.log(action);
    }
  } catch (_error) {
    // Ignore unreadable or malformed data; no invalid task action is displayed.
  }
}

checkTasks();
setInterval(checkTasks, INTERVAL_MS);
