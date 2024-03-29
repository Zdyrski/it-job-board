/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { USER_ROLE_MAP } from '../../utils/constants';
import { getHeaders } from '../../utils/helperFunctions';
import AlertsComponent from '../AlertsComponent/AlertsComponent';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import ListLogo from '../CompanyLogo/ListLogo';
import OfferLogo from '../CompanyLogo/OfferLogo';
import { RowCenterContainer } from '../Containers/Containers.styled';
import { StyledTextField } from '../Inputs/Inputs.styled';
import {
  MainContainer, BackgroundContainer, SubContainer, DetailRowContainer, Title,
} from './AccountSettings.styled';

const ACCOUNT_URL = 'http://localhost:8080/users/account';
const CV_UPLOAD_URL = 'http://localhost:8080/users/account/cv';
const PASSWORD_CHANGE_URL = 'http://localhost:8080/users/account/password';

const initialUserState = {
  email: '',
  role: '',
  joinDate: '',
};

const initialEmployeeState = {
  firstName: '',
  lastName: '',
  cvFileName: '',
};

const initialEmployerState = {
  companyName: '',
  companySize: '',
  companySiteUrl: '',
  companyLogoUrl: '',
};

const initialPasswords = {
  oldPassword: '',
  newPassword: '',
  newPassword2: '',
  showPassword: false,
};

const initialResponseState = {
  openError: false,
  openSuccess: false,
  errorMessage: '',
  successMessage: 'Succesfully changed password.',
};

function AccountSettings() {
  const [file, setFile] = useState<any | null>(null);
  const [userState, setUserState] = useState(initialUserState);
  const [employeeState, setEmployeeState] = useState(initialEmployeeState);
  const [employerState, setEmployerState] = useState(initialEmployerState);
  const [passwords, setPasswords] = useState(initialPasswords);
  const [responseState, setResponseState] = useState(initialResponseState);

  const handlePasswordsChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target!.files![0]);
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

  const handleUploadButton = () => {
    const formData = new FormData();
    formData.append('file', file);
    const headers = getHeaders();
    headers['Content-Type'] = 'multipart/form-data';
    axios.post(CV_UPLOAD_URL, formData, { headers }).then((response) => {
      if (response.status === 200) {
        setEmployeeState({ ...employeeState, cvFileName: response.data });
      }
    });
  };

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

  const handleChangePassword = () => {
    const headers = getHeaders();
    const data = {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    };
    axios.post(PASSWORD_CHANGE_URL, data, { headers }).then((response) => {
      if (response.status === 200) {
        setPasswords(initialPasswords);
        setSuccessAlert();
      }
    }).catch((error) => {
      switch (error.response.status) {
        case 400: { setErrorAlert('Wrong password'); break; }
        default: { setErrorAlert('Error'); break; }
      }
    });
  };

  const userComponent = (
    <SubContainer>
      <Title>Account main info</Title>
      <DetailRowContainer>
        <div>Role:</div>
        <div>{USER_ROLE_MAP.get(userState.role)}</div>
      </DetailRowContainer>
      <DetailRowContainer>
        <div>E-mail:</div>
        <div>{userState.email}</div>
      </DetailRowContainer>
      <DetailRowContainer>
        <div>Joined:</div>
        <div>{moment(new Date(userState.joinDate)).format('MMMM Do YYYY')}</div>
      </DetailRowContainer>
    </SubContainer>
  );

  const employeeComponent = (
    <SubContainer>
      <Title>Account role details</Title>
      <DetailRowContainer>
        <div>First name:</div>
        <div>{employeeState.firstName}</div>
      </DetailRowContainer>
      <DetailRowContainer>
        <div>Last name:</div>
        <div>{employeeState.lastName}</div>
      </DetailRowContainer>
    </SubContainer>
  );

  const employerComponent = (
    <SubContainer>
      <Title>Account role details</Title>
      <DetailRowContainer>
        <div>Company name:</div>
        <div>{employerState.companyName}</div>
      </DetailRowContainer>
      <DetailRowContainer>
        <div>Company size:</div>
        <div>{employerState.companySize}</div>
      </DetailRowContainer>
      <DetailRowContainer>
        <div>Company site:</div>
        <div>{employerState.companySiteUrl}</div>
      </DetailRowContainer>
      <Title>Logo</Title>
      <ListLogo logoSrc={employerState.companyLogoUrl} />
    </SubContainer>
  );

  const employeeCV = (
    <SubContainer>
      <Title>CV</Title>
      <DetailRowContainer>
        <div>File name:</div>
        <div>{employeeState.cvFileName}</div>
      </DetailRowContainer>
      <input
        type="file"
        accept=".pdf"
        name="cv"
        onChange={handleFileChange}
      />
      <GlitchedButton placeholder="Upload" onClick={handleUploadButton} />
    </SubContainer>
  );

  useEffect(() => {
    const headers = getHeaders();
    axios.get(ACCOUNT_URL, { headers }).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        setUserState({
          email: data.email,
          role: data.role,
          joinDate: data.joinDate,
        });
        if (data.role === 'ROLE_EMPLOYER') {
          setEmployerState({
            companyName: data.companyName,
            companySize: data.companySize,
            companySiteUrl: data.companySiteUrl,
            companyLogoUrl: data.companyLogoUrl,
          });
        } else if (data.role === 'ROLE_EMPLOYEE') {
          setEmployeeState({
            firstName: data.firstName,
            lastName: data.lastName,
            cvFileName: data.cvFileName,
          });
        }
      }
    });
  }, []);

  return (
    <MainContainer>
      <BackgroundContainer>
        {userComponent}
        {{
          ROLE_EMPLOYEE: employeeComponent,
          ROLE_EMPLOYER: employerComponent,
        }[userState.role]}
        {userState.role === 'ROLE_EMPLOYEE' && employeeCV}
        <SubContainer>
          <Title>Change password</Title>
          <AlertsComponent
            openError={responseState.openError}
            openSuccess={responseState.openSuccess}
            errorMessage={responseState.errorMessage}
            successMessage={responseState.successMessage}
          />
          <StyledTextField
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handlePasswordsChange}
            type={passwords.showPassword ? 'text' : 'password'}
            label="Old password"
            variant="standard"
          />
          <StyledTextField
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordsChange}
            type={passwords.showPassword ? 'text' : 'password'}
            label="New password"
            variant="standard"
          />
          <StyledTextField
            name="newPassword2"
            value={passwords.newPassword2}
            onChange={handlePasswordsChange}
            type={passwords.showPassword ? 'text' : 'password'}
            label="Repeat new password"
            variant="standard"
          />
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {passwords.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          <GlitchedButton placeholder="Change Password" onClick={handleChangePassword} />
        </SubContainer>
      </BackgroundContainer>
    </MainContainer>
  );
}

export default AccountSettings;
