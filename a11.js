// A11y / general utilities for Kanban Board
console.log("a11 utility module loaded successfully");

module.exports = {
  logStatus: (status) => {
    console.log(`[Kanban Board] Status updated: ${status}`);
  },
  getAriaAttributesForTask: (task) => {
    if (!task) return { 'aria-label': 'Empty task slot' };
    const priority = task.priority ? `Priority ${task.priority}` : 'No priority set';
    const status = task.status ? `Status ${task.status}` : 'No status set';
    return {
      'role': 'article',
      'aria-label': `Task: ${task.title || 'Untitled'}. ${priority}. ${status}.`,
      'tabIndex': 0
    };
  },
  formatAriaLabel: (title, status, priority) => {
    const parts = [title || 'Task'];
    if (status) parts.push(`status ${status}`);
    if (priority) parts.push(`priority ${priority}`);
    return parts.join(', ');
  },
  announceTaskMove: (taskTitle, fromColumn, toColumn) => {
    const message = `Task "${taskTitle}" moved from ${fromColumn} to ${toColumn}`;
    console.log(`[A11y Announcement] ${message}`);
    return message;
  }
};

