import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ErrorAlert = ({ error, onClose }) => {
  return (
    <Collapse in={Boolean(error)}>
      {error && (
        <Alert
          severity="error"
          action={
            onClose && (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}
    </Collapse>
  );
};

export default ErrorAlert;
