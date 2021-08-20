import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

interface ISimpleSnackbar {
  isOpen: boolean

  setIsOpen(isOpen: boolean): void

  message: string
}

const SimpleSnackbar: React.FC<ISimpleSnackbar> = ({isOpen, setIsOpen, message}) => {

  const handleClick = (): void => {
    setIsOpen(true);
  };

  const handleClose = (event: any, reason: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isOpen}
        autoHideDuration={1500}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
};
export default SimpleSnackbar