import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Redirect authenticated users away from login/register pages
  if (user && (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/')) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 