import { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const TaskContext = createContext(null);

// Separate hook file
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

// Main Provider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async (userId = null) => {
    setLoading(true);
    try {
      const response = await api.get(userId ? `/tasks?userId=${userId}` : '/tasks');
      const tasksData = response.data?.tasks || response.data || [];
      setTasks(Array.isArray(tasksData) ? tasksData : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      const newTask = response.data;
      setTasks(prevTasks => [...prevTasks, newTask]);
      await fetchTasks(); // Refresh the task list
      toast.success('Task created successfully');
      return newTask;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  }, [fetchTasks]);

  const updateTask = useCallback(async (id, taskData) => {
    try {
      const response = await api.patch(`/tasks/${id}`, taskData);
      const updatedTask = response.data;
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === id ? { ...task, ...updatedTask } : task
        )
      );
      
      await fetchTasks();
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  }, [fetchTasks]);

  const deleteTask = useCallback(async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      await fetchTasks(); // Refresh the task list
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  }, [fetchTasks]);

  const value = {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Default export for the context itself
export default TaskContext;