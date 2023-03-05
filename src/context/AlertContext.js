import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
const AlertContext = React.createContext();

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const AlertComponent = ({ type, msg }) => {
    // TYPES CAN BE: 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'
    useEffect(() => {
      const timeout = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 4000);
      return () => clearTimeout(timeout);
    }, []);
    return (
      <Alert variant={type} dismissible>
        {msg}
      </Alert>
    );
  };

  // SAMPLE OF USAGE:
  //   <Button onClick={() => showAlert(true, 'success', 'Item added to the list')}>
  //     Success alert
  //   </Button>

  // PLACE THIS ANYWHERE YOU WANT THE ALERT TO SHOW
  //     {alert.show && <AlertComponent {...alert} />}

  return (
    <AlertContext.Provider
      value={{
        AlertComponent,
        alert,
        setAlert,
        showAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider, AlertContext };
