import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../context/TaskContext';
import TaskModal from './TaskModal';
import { formatDate } from '../../utils/dateUtils';

const TaskCard = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { deleteTask, updateTask } = useTask();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await updateTask(task._id, {
        ...task,
        status: task.status === 'active' ? 'completed' : 'active'
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <>
      <div className={`bg-white rounded-lg shadow p-6 ${task.status === 'completed' ? 'opacity-75' : ''}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">Due: {formatDate(task.dueDate)}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowModal(true)}
              className="text-indigo-600 hover:text-indigo-900"
              disabled={isUpdating}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-900"
              disabled={isUpdating}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={handleStatusChange}
              disabled={isUpdating}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              {task.status === 'completed' ? 'Completed' : 'Mark as Complete'}
            </span>
          </label>
        </div>
      </div>

      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        task={task}
      />
    </>
  );
};

export default TaskCard; 