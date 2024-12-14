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
      <div className={`card-gradient rounded-xl p-6 shadow-lg transform transition-all duration-200 hover:scale-[1.02] ${task.status === 'completed' ? 'opacity-75' : ''}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'}`}>
              {task.title}
            </h3>
            <p className="text-gray-400 mt-2">{task.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <p className="text-sm text-gray-400">Due: {formatDate(task.dueDate)}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowModal(true)}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
              disabled={isUpdating}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-300 transition-colors"
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
              className="form-checkbox h-5 w-5 text-indigo-500 rounded border-gray-500 bg-transparent"
            />
            <span className="ml-2 text-sm text-gray-400">
              {task.status === 'completed' ? 'Completed' : 'Mark as Complete'}
            </span>
          </label>
        </div>
      </div>

      <TaskModal isOpen={showModal} onClose={() => setShowModal(false)} task={task} />
    </>
  );
};

export default TaskCard; 