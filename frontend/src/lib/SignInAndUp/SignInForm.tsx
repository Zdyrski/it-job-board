import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import FormButton from '../Buttons/FormButton/FormButton';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { FormContainer, PageContainer } from './SignInAndUp.styled';

function SignInForm() {
  const [state, setState] = useState({
    login: '',
    password: '',
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
        <StyledTextField name="login" value={state.login} onChange={handleChange} label="Login" variant="standard" />
        <StyledTextField name="password" value={state.password} onChange={handleChange} type={state.showPassword ? 'text' : 'password'} label="Password" variant="standard" />
        <IconButton
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {state.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
        <FormButton placeholder="Don't have account yet? Sign up." navigateTo="/sign-up" />
        <GlitchedButton placeholder="SIGN IN" />
      </FormContainer>
    </PageContainer>
  );
}

export default SignInForm;
