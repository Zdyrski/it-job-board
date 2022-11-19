import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../lib/Navbar/Navbar';
import { getHeaders } from '../constants';
import AlertsComponent from '../lib/AlertsComponent/AlertsComponent';
import GlitchedButton from '../lib/Buttons/GlitchedButton/GlitchedButton';
import { FlexColumnCenterContainer } from '../lib/Containers/Containers.styled';

const CONFIRM_EMAIL_URL = 'http://localhost:8080/user/register/confirm';

const initialResponseState = {
  openError: false,
  openSuccess: false,
  errorMessage: '',
  successMessage: 'Succesfully confirmed email. Redirecting to sign-in page...',
};

function ConfirmEmail() {
  const [responseState, setResponseState] = useState(initialResponseState);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const setSuccessAlert = () => {
    setResponseState({
      ...responseState,
      openError: false,
      openSuccess: true,
    });
  };

  const setErrorAlert = (errorMessage: string) => {
    setResponseState({
      ...responseState,
      errorMessage,
      openError: true,
      openSuccess: false,
    });
  };

  const handleConfirm = () => {
    setResponseState(initialResponseState);
    const token = searchParams.get('token');
    if (token === null) {
      return;
    }
    const headers = getHeaders();
    const config = {
      headers,
      params: searchParams,
    };
    axios.get(CONFIRM_EMAIL_URL, config).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setSuccessAlert();
        setTimeout(() => navigate('/sign-in'), 5000);
      }
    }).catch((error) => {
      console.log(error);
      switch (error.response.status) {
        case 400: { setErrorAlert('Invalid token.'); break; }
        case 401: { setErrorAlert('Your confirmation token has expired.'); break; }
        default: { setErrorAlert('Error'); break; }
      }
    });
  };

  return (
    <FlexColumnCenterContainer>
      <Navbar filterBar={false} />
      <AlertsComponent
        openError={responseState.openError}
        openSuccess={responseState.openSuccess}
        errorMessage={responseState.errorMessage}
        successMessage={responseState.successMessage}
      />
      <GlitchedButton placeholder="Confirm email" onClick={handleConfirm} />
    </FlexColumnCenterContainer>
  );
}

export default ConfirmEmail;
