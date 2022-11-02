import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import AlertsComponent from '../AlertsComponent/AlertsComponent';
import FormButton from '../Buttons/FormButton/FormButton';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { FormContainer, PageContainer } from './SignInAndUp.styled';

const SIGN_IN_URL = 'http://localhost:8080/user/login';

const initialState = {
  email: '',
  password: '',
  showPassword: false,
};

const initialResponseState = {
  openError: false,
  openSuccess: false,
  errorMessage: '',
  successMessage: 'Succesfully signed in. Redirecting...',
};

function SignInForm() {
  // TODO validation
  const [state, setState] = useState(initialState);
  const [responseState, setResponseState] = useState(initialResponseState);
  const navigate = useNavigate();

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const setSuccessAlert = () => {
    setResponseState({
      ...responseState,
      openError: false,
      openSuccess: true,
    });
  };

  const setErrorAlert = (error: any) => {
    setResponseState({
      ...responseState,
      errorMessage: error.message,
      openError: true,
      openSuccess: false,
    });
  };

  const handleSignIn = () => {
    const signInData = { email: state.email, password: state.password };
    axios.post(SIGN_IN_URL, signInData).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('jwt-token', response.headers['jwt-token']);
        setSuccessAlert();
        setState(initialState);
        setTimeout(() => navigate('/'), 2000);
      }
    }).catch((error) => {
      setErrorAlert(error);
    });
  };

  return (
    <PageContainer>
      <FormContainer>
        <AlertsComponent
          openError={responseState.openError}
          openSuccess={responseState.openSuccess}
          errorMessage={responseState.errorMessage}
          successMessage={responseState.successMessage}
        />
        <StyledTextField name="email" value={state.email} onChange={handleChange} label="Email" variant="standard" />
        <StyledTextField name="password" value={state.password} onChange={handleChange} type={state.showPassword ? 'text' : 'password'} label="Password" variant="standard" />
        <IconButton
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {state.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
        <FormButton placeholder="Don't have account yet? Sign up." navigateTo="/sign-up" />
        <GlitchedButton placeholder="SIGN IN" onClick={handleSignIn} />
      </FormContainer>
    </PageContainer>
  );
}

export default SignInForm;
