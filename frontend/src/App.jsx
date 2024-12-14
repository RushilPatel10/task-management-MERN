import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ToastContainer } from 'react-toastify';
import router from './router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
