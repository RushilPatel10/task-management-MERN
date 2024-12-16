import { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/task/all');
      setTasks(response.data.tasks || []);
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
      const response = await api.post('/task/create', taskData);
      const newTask = response.data;
      setTasks(prevTasks => [...prevTasks, newTask]);
      toast.success('Task created successfully');
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    try {
      const response = await api.patch(`/task/${id}`, taskData);
      const updatedTask = response.data;
      setTasks(prevTasks => 
        prevTasks.map(task => task._id === id ? updatedTask : task)
      );
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await api.delete(`/task/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      fetchTasks,
      createTask,
      updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};