import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControlLabel, IconButton, Radio, RadioGroup,
} from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormButton from '../Buttons/FormButton/FormButton';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { FormContainer, PageContainer } from './SignInAndUp.styled';
import AlertsComponent from '../AlertsComponent/AlertsComponent';

const SIGN_UP_URL = 'http://localhost:8080/user/register';

const initialState = {
  email: '',
  password1: '',
  password2: '',
  role: 'ROLE_EMPLOYEE',
  showPassword: false,
};

const initialResponseState = {
  openError: false,
  openSuccess: false,
  errorMessage: '',
  successMessage: 'Succesfully signed up. Redirecting...',
};

function SignUpForm() {
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

  const handleSignUp = () => {
    const signUpData = { email: state.email, password: state.password1, role: state.role };
    axios.post(SIGN_UP_URL, signUpData).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setSuccessAlert();
        setState(initialState);
        setTimeout(() => navigate('/sign-in'), 2000);
      }
    }).catch((error) => {
      console.log(error);
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
        <StyledTextField name="email" value={state.email} onChange={handleChange} label="E-mail" variant="standard" />
        <StyledTextField name="password1" value={state.password1} onChange={handleChange} type={state.showPassword ? 'text' : 'password'} label="Password" variant="standard" />
        <StyledTextField name="password2" value={state.password2} onChange={handleChange} type={state.showPassword ? 'text' : 'password'} label="Repeat password" variant="standard" />
        <RadioGroup name="role" value={state.role} onChange={handleChange}>
          <FormControlLabel value="ROLE_EMPLOYEE" control={<Radio />} label="Employee" />
          <FormControlLabel value="ROLE_EMPLOYER" control={<Radio />} label="Employer" />
        </RadioGroup>
        <IconButton
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {state.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
        <FormButton placeholder="Back to sign in." navigateTo="/sign-in" />
        <GlitchedButton placeholder="SIGN UP" onClick={handleSignUp} />
      </FormContainer>
    </PageContainer>
  );
}

export default SignUpForm;
