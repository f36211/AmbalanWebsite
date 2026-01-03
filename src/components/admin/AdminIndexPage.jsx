import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminIndexPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate('/admin/edit/home', { replace: true });
      } else {
        navigate('/admin/login', { replace: true });
      }
    }
  }, [isAuthenticated, loading, navigate]);

  // Render a loading indicator while the context is checking the auth state
  return (
      <div className="admin-page-wrapper">
        <div className="admin-loading-container">
          <div className="admin-spinner"></div>
        </div>
      </div>
    );
};

export default AdminIndexPage;
