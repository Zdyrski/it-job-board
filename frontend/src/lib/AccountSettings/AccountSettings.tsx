/* eslint-disable no-unused-vars */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import {
  MainContainer, BackgroundContainer, SubContainer, DetailRowContainer, Title,
} from './AccountSettings.styled';

function AccountSettings() {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cv: '',
  });

  const [passwords, setPasswords] = useState({
    password1: '',
    password2: '',
    showPassword: false,
  });

  const handlePasswordsChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswords({
      ...passwords,
      showPassword: !passwords.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <MainContainer>
      <BackgroundContainer>
        <SubContainer>
          <Title>Account details</Title>
          <DetailRowContainer>
            <div>First name:</div>
            <div>{state.firstName}</div>
          </DetailRowContainer>
          <DetailRowContainer>
            <div>Last name:</div>
            <div>{state.lastName}</div>
          </DetailRowContainer>
          <DetailRowContainer>
            <div>E-mail:</div>
            <div>{state.email}</div>
          </DetailRowContainer>
        </SubContainer>
        <SubContainer>
          <Title>CV</Title>
          <DetailRowContainer>
            <div>{state.cv}</div>
          </DetailRowContainer>
        </SubContainer>
        <SubContainer>
          <Title>Change password</Title>
          <TextField name="password1" value={passwords.password1} onChange={handlePasswordsChange} type={passwords.showPassword ? 'text' : 'password'} label="Password" variant="standard" />
          <TextField name="password2" value={passwords.password2} onChange={handlePasswordsChange} type={passwords.showPassword ? 'text' : 'password'} label="Repeat password" variant="standard" />
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {passwords.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </SubContainer>
        <GlitchedButton placeholder="Save" />
      </BackgroundContainer>
    </MainContainer>
  );
}

export default AccountSettings;
