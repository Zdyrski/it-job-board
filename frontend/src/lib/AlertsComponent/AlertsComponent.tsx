import { Alert, Collapse } from '@mui/material';
import React from 'react';
import { AlertsComponentInterface } from '../../utils/types';

function AlertsComponent({
  openError, openSuccess, errorMessage, successMessage,
} : AlertsComponentInterface) {
  return (
    <div>
      <Collapse in={openError}>
        <Alert variant="outlined" severity="error">
          {errorMessage}
        </Alert>
      </Collapse>
      <Collapse in={openSuccess}>
        <Alert variant="outlined" severity="success">
          {successMessage}
        </Alert>
      </Collapse>
    </div>
  );
}

export default AlertsComponent;
