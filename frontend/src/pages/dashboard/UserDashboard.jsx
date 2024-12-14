import { useAuth } from '../../context/AuthContext';
import { TaskProvider } from '../../context/TaskContext';
import TaskList from '../../components/tasks/TaskList';
import Navbar from '../../components/common/Navbar';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name}
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your tasks and stay organized
            </p>
          </div>
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
};

export default UserDashboard; 