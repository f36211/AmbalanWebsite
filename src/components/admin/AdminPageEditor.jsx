import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import Toast from './Toast';
import './Admin.css';

// A default structure for creating a new page in the UI
const createNewPageData = (slug) => ({
  slug,
  title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Page`,
  status: 'draft',
  sections: [
    {
      _id: 'hero-section-' + Date.now(),
      type: 'hero',
      enabled: true,
      content: { title: 'Welcome!', description: 'This is a new page.' }
    }
  ],
});


const AdminPageEditor = () => {
  const { slug } = useParams();
  const { logout } = useAuth();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchPage = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // The ProtectedRoute handles the 401 redirect now
      const res = await axios.get(`/api/admin-get-page?slug=${slug}`);
      setPage(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setPage(createNewPageData(slug));
      } else {
        setError(err.response?.data?.message || 'Failed to fetch page data');
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const handleContentChange = (sectionIndex, field, value) => {
    const newPage = { ...page };
    newPage.sections[sectionIndex].content[field] = value;
    setPage(newPage);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
        await axios.put('/api/admin-update-page', {
            slug: page.slug,
            pageData: page
        });
        setToastMessage('Page saved successfully!');
        setShowToast(true);
    } catch(err) {
        setError(err.response?.data?.message || 'Failed to save page. Please try again.');
    } finally {
        setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-page-wrapper">
        <div className="admin-loading-container">
          <div className="admin-spinner"></div>
          <p>Loading Page Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-wrapper">
      <Toast message={toastMessage} show={showToast} onDismiss={() => setShowToast(false)} />
      <div className="editor-header">
        <h1>
          Editing: <span style={{ fontWeight: '400' }}>{page?.title || 'New Page'}</span>
        </h1>
        <div style={{display: 'flex', gap: '1rem'}}>
            <button onClick={handleSave} disabled={saving || !page} className="admin-button" style={{width: 'auto'}}>
            {saving ? 'Saving...' : 'Save Page'}
            </button>
            <button onClick={logout} className="admin-button" style={{width: 'auto', backgroundColor: 'var(--admin-text-secondary)'}}>
                Logout
            </button>
        </div>
      </div>

      <div className="editor-content">
        {error && <div className="admin-error-message">{error}</div>}
        
        {!page ? (
          <div className="admin-state-container">
             <p>Could not load page data.</p>
          </div>
        ) : (
          page.sections.map((section, index) => (
            <div key={section._id} className="editor-section-card">
              <h3>{section.type}</h3>
              <div className="form-group">
                 {Object.keys(section.content).map(field => {
                   if (typeof section.content[field] === 'string') {
                     return (
                      <div key={field} style={{marginBottom: '1rem'}}>
                         <label style={{textTransform: 'capitalize', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--admin-text-secondary)'}}>{field}</label>
                         <input
                           className="admin-input"
                           type="text"
                           value={section.content[field]}
                           onChange={(e) => handleContentChange(index, field, e.target.value)}
                         />
                       </div>
                     )
                   }
                   return null;
                 })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPageEditor;
