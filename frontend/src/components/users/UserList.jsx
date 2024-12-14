import { useState, useEffect } from 'react';
import api from '../../services/api';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Users</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => onSelectUser(null)}
          className={`px-4 py-2 rounded-md ${
            !selectedUser
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          My Tasks
        </button>
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => onSelectUser(user)}
            className={`px-4 py-2 rounded-md ${
              selectedUser?._id === user._id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList; 