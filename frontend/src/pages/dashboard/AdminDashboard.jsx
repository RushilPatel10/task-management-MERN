import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TaskProvider } from '../../context/TaskContext';
import TaskList from '../../components/tasks/TaskList';
import Navbar from '../../components/common/Navbar';
import UserList from '../../components/admin/UserList';
import api from '../../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage users and their tasks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-4">Users</h2>
                {loading ? (
                  <p>Loading users...</p>
                ) : (
                  <UserList
                    users={users}
                    selectedUser={selectedUser}
                    onSelectUser={setSelectedUser}
                  />
                )}
              </div>
            </div>

            <div className="md:col-span-3">
              <TaskList selectedUser={selectedUser} />
            </div>
          </div>
        </main>
      </div>
    </TaskProvider>
  );
};

export default AdminDashboard; 