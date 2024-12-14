import { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const UserList = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      <button
        onClick={() => onSelectUser(null)}
        className={`px-4 py-2 rounded-lg transition-all duration-200 min-w-max ${
          !selectedUser
            ? 'bg-indigo-500/20 text-indigo-300 border-2 border-indigo-500/50'
            : 'text-gray-400 hover:bg-gray-700/50'
        }`}
      >
        My Tasks
      </button>
      {users.map((user) => (
        <button
          key={user._id}
          onClick={() => onSelectUser(user)}
          className={`px-4 py-2 rounded-lg transition-all duration-200 min-w-max ${
            selectedUser?._id === user._id
              ? 'bg-indigo-500/20 text-indigo-300 border-2 border-indigo-500/50'
              : 'text-gray-400 hover:bg-gray-700/50'
          }`}
        >
          {user.name}
        </button>
      ))}
    </div>
  );
};

export default UserList; 