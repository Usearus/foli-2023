import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AlertContext } from '../context/AlertContext';

const TestingPage = () => {
  const { AlertComponent, alert, showAlert } = useContext(AlertContext);

  return (
    <>
      <h1>Testing Page</h1>
      <hr />

      <Button
        onClick={() => showAlert(true, 'success', 'Item added to the list')}
      >
        Success alert
      </Button>
      <Button
        onClick={() => showAlert(true, 'warning', 'Item deleted from the list')}
      >
        Warning alert
      </Button>
      {alert.show && <AlertComponent {...alert} />}
    </>
  );
};

export default TestingPage;
