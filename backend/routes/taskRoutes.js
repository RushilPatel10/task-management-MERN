const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.use(protect); // All routes require authentication

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router; 