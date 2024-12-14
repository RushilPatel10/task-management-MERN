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
    <div className="min-h-screen">
      <nav className="glass-morphism sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Task Management System
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-300">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="glass-morphism rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              {selectedUser ? `${selectedUser.name}'s Tasks` : 'My Tasks'}
            </h2>
            <button
              onClick={() => setShowTaskModal(true)}
              className="button-gradient px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
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