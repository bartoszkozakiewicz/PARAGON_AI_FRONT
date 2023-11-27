import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

type Props = {
  msg: string;
  isError: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomizedSnackbar({
  msg,
  isError,
  open,
  setOpen,
}: Props) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  console.log('mes', msg);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      style={{ marginTop: '50px' }}
    >
      {!isError ? (
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {msg}
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {msg}
        </Alert>
      )}
    </Snackbar>
  );
}
