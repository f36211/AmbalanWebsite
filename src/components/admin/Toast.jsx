import React, { useState, useEffect } from 'react';
import './Admin.css'; // We'll add styles here

const toastStyles = {
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'var(--admin-success-color)',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  zIndex: '1000',
  opacity: 0,
  transition: 'opacity 0.5s, bottom 0.5s',
};

const toastVisibleStyles = {
  ...toastStyles,
  opacity: 1,
  bottom: '40px',
}

const Toast = ({ message, show, onDismiss }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  return (
    <div style={show ? toastVisibleStyles : toastStyles}>
      {message}
    </div>
  );
};

export default Toast;
