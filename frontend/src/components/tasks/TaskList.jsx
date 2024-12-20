import { useEffect } from 'react';
import { useTask } from '../../context/TaskContext';
import TaskCard from './TaskCard';

const TaskList = ({ selectedUser }) => {
  const { tasks, loading, fetchTasks } = useTask();

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks(selectedUser?._id);
    };
    loadTasks();
  }, [selectedUser, fetchTasks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="glass-morphism rounded-xl p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="text-xl font-medium text-gray-200 mb-2">No tasks found</h3>
        <p className="text-gray-400">
          {selectedUser 
            ? `${selectedUser.name} hasn't created any tasks yet`
            : 'Create your first task by clicking the "Create New Task" button above'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList; 