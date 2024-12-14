const Task = require('../models/Task');
const { validateTask } = require('../utils/validation');

exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { user: req.user.id };
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    let sort = {};
    if (req.query.sortBy) {
      sort[req.query.sortBy] = req.query.order === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = -1;
    }

    if (req.user.role === 'admin' && req.query.userId) {
      query.user = req.query.userId;
    }

    const tasks = await Task.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email');

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { error, value } = validateTask(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (req.user.role !== 'admin') {
      const taskCount = await Task.countDocuments({ user: req.user.id });
      if (taskCount >= 10) {
        return res.status(400).json({ 
          message: 'Task limit reached. Maximum 10 tasks allowed.' 
        });
      }
    }

    const task = new Task({
      ...value,
      user: req.user.id
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { error, value } = validateTask(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 