import { useState, useEffect } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SuccessAlert = ({ message, onClose, autoHideDuration = 5000 }) => {
  const [open, setOpen] = useState(Boolean(message));

  useEffect(() => {
    setOpen(Boolean(message));
    if (message && autoHideDuration) {
      const timer = setTimeout(() => {
        setOpen(false);
        if (onClose) {
          onClose();
        }
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [message, autoHideDuration, onClose]);

  return (
    <Collapse in={open}>
      {message && (
        <Alert
          severity="success"
          action={
            onClose && (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  onClose();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}
    </Collapse>
  );
};

export default SuccessAlert;
