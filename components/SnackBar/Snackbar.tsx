import React, {SyntheticEvent} from 'react';
import Snackbar, {SnackbarCloseReason} from '@material-ui/core/Snackbar';

interface ISimpleSnackbar {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  message: string
}

const SimpleSnackbar: React.FC<ISimpleSnackbar> = ({isOpen, setIsOpen, message}) => {
  const handleClose = (event: SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void => {
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