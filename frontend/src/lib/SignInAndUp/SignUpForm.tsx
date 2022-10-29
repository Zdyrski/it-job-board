import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import FormButton from '../Buttons/FormButton/FormButton';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { FormContainer, PageContainer } from './SignInAndUp.styled';

function SignUpForm() {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: '',
    showPassword: false,
  });

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
  return (
    <PageContainer>
      <FormContainer>
        <StyledTextField name="firstName" value={state.firstName} onChange={handleChange} label="First name" variant="standard" />
        <StyledTextField name="lastName" value={state.lastName} onChange={handleChange} label="Last name" variant="standard" />
        <StyledTextField name="email" value={state.email} onChange={handleChange} label="E-mail" variant="standard" />
        <StyledTextField name="password1" value={state.password1} onChange={handleChange} type={state.showPassword ? 'text' : 'password'} label="Password" variant="standard" />
        <StyledTextField name="password2" value={state.password2} onChange={handleChange} type={state.showPassword ? 'text' : 'password'} label="Repeat password" variant="standard" />
        <IconButton
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {state.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
        <FormButton placeholder="Back to sign in." navigateTo="/sign-in" />
        <GlitchedButton placeholder="SIGN UP" />
      </FormContainer>
    </PageContainer>
  );
}

export default SignUpForm;
