import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TaskList from '../../components/tasks/TaskList';
import UserList from '../../components/users/UserList';
import TaskModal from '../../components/tasks/TaskModal';

const DashboardPage = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Task Management System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedUser ? `${selectedUser.name}'s Tasks` : 'My Tasks'}
            </h2>
            <button
              onClick={() => setShowTaskModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create New Task
            </button>
          </div>

          {isAdmin && (
            <div className="mb-8">
              <UserList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
            </div>
          )}

          <TaskList selectedUser={selectedUser} />

          <TaskModal
            isOpen={showTaskModal}
            onClose={() => setShowTaskModal(false)}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 