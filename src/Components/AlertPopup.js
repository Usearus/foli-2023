import { Alert } from 'react-bootstrap';
import useAlert from '../Custom Hooks/useAlert';

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        variant={type}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 10%)',
          width: '95%',
          zIndex: 10,
        }}
        dismissible
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
