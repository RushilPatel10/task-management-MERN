exports.validateTask = (task) => {
  const errors = {};

  if (!task.title?.trim()) {
    errors.title = 'Title is required';
  }

  if (!task.description?.trim()) {
    errors.description = 'Description is required';
  }

  if (!task.dueDate) {
    errors.dueDate = 'Due date is required';
  }

  if (task.priority && !['low', 'medium', 'high'].includes(task.priority)) {
    errors.priority = 'Invalid priority level';
  }

  if (task.status && !['active', 'completed'].includes(task.status)) {
    errors.status = 'Invalid status';
  }

  return {
    error: Object.keys(errors).length > 0 ? { details: [{ message: Object.values(errors)[0] }] } : null,
    value: task
  };
};

exports.validateUser = (user) => {
  const errors = {};

  if (!user.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!user.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(user.email)) {
    errors.email = 'Invalid email format';
  }

  if (!user.password?.trim()) {
    errors.password = 'Password is required';
  } else if (user.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    error: Object.keys(errors).length > 0 ? { details: [{ message: Object.values(errors)[0] }] } : null,
    value: user
  };
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} 