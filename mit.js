// MIT License / helper module for task categorization
console.log("mit module initialized");

module.exports = {
  getCategoryColor: (category) => {
    if (!category) return '#4b5563';
    switch (category.toLowerCase()) {
      case 'design': return '#e11d48'; // Rose
      case 'development': return '#2563eb'; // Blue
      case 'work': return '#16a34a'; // Green
      case 'testing': return '#8b5cf6'; // Purple
      default: return '#4b5563'; // Gray
    }
  },
  getPriorityColor: (priority) => {
    if (!priority) return '#6b7280';
    switch (priority.toLowerCase()) {
      case 'high': return '#dc2626'; // Red
      case 'medium': return '#d97706'; // Amber
      case 'low': return '#059669'; // Emerald
      default: return '#6b7280'; // Gray
    }
  },
  formatDueDate: (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },
  truncateText: (str, maxLength = 50) => {
    if (!str || str.length <= maxLength) return str || '';
    return str.substring(0, maxLength) + '...';
  },
  getStatusBadgeClass: (status) => {
    if (!status) return 'badge-secondary';
    switch (status.toLowerCase()) {
      case 'todo': return 'badge-todo';
      case 'inprogress': return 'badge-inprogress';
      case 'done': return 'badge-done';
      default: return 'badge-secondary';
    }
  }
};

