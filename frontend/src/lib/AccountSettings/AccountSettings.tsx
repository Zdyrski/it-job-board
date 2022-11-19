/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { getHeaders } from '../../constants';
import AlertsComponent from '../AlertsComponent/AlertsComponent';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import ListLogo from '../CompanyLogo/ListLogo';
import OfferLogo from '../CompanyLogo/OfferLogo';
import { RowCenterContainer } from '../Containers/Containers.styled';
import { StyledTextField } from '../Inputs/Inputs.styled';
import {
  MainContainer, BackgroundContainer, SubContainer, DetailRowContainer, Title,
} from './AccountSettings.styled';

const ACCOUNT_URL = 'http://localhost:8080/user/account';
const CV_UPLOAD_URL = 'http://localhost:8080/user/account/cv';
const PASSWORD_CHANGE_URL = 'http://localhost:8080/user/account/password';

const initialUserState = {
  email: '',
  role: '',
  joinDate: '',
};

const initialEmployeeState = {
  firstName: '',
  lastName: '',
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
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState<any | null>(null);
  const [userState, setUserState] = useState(initialUserState);
  const [employeeState, setEmployeeState] = useState(initialEmployeeState);
  const [employerState, setEmployerState] = useState(initialEmployerState);
  const [passwords, setPasswords] = useState(initialPasswords);
  const [responseState, setResponseState] = useState(initialResponseState);

  const handlePasswordsChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleEmployerChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEmployerState({ ...employerState, [e.target.name]: e.target.value });
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

  const handleEditButton = () => {
    setEditMode((current) => !current);
  };

  const handleSaveButton = () => {
    const updatedData = userState.role === 'ROLE_EMPLOYEE' ? employeeState : employerState;
    console.log(updatedData);
    const headers = getHeaders();
    axios.post(ACCOUNT_URL, updatedData, { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleUploadButton = () => {
    const formData = new FormData();
    formData.append('file', file);
    const headers = getHeaders();
    headers['Content-Type'] = 'multipart/form-data';
    axios.post(CV_UPLOAD_URL, formData, { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        // TODO something about cv
      }
    }).catch((error) => {
      console.log(error);
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
        console.log(response);
        setPasswords(initialPasswords);
        setSuccessAlert();
      }
    }).catch((error) => {
      console.log(error);
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
        <div>{userState.role}</div>
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
      {editMode ? (
        <StyledTextField
          value={employerState.companyLogoUrl}
          name="companyLogoUrl"
          onChange={handleEmployerChange}
          variant="standard"
        />
      ) : (
        <ListLogo logoSrc={employerState.companyLogoUrl} />
      )}
    </SubContainer>
  );

  const employeeCV = (
    <SubContainer>
      <Title>CV</Title>
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
          });
        }
        console.log(response);
      }
      // TODO something
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <MainContainer>
      <BackgroundContainer>
        {userComponent}
        {userState.role === 'ROLE_EMPLOYEE' ? employeeComponent : employerComponent}
        <RowCenterContainer>
          {userState.role === 'ROLE_EMPLOYER' && <GlitchedButton placeholder={editMode ? 'Cancel' : 'Edit'} onClick={handleEditButton} />}
          {editMode && <GlitchedButton placeholder="Save" onClick={handleSaveButton} />}
        </RowCenterContainer>
        {userState.role === 'ROLE_EMPLOYEE' && employeeCV}
        <SubContainer>
          <Title>Change password</Title>
          <AlertsComponent
            openError={responseState.openError}
            openSuccess={responseState.openSuccess}
            errorMessage={responseState.errorMessage}
            successMessage={responseState.successMessage}
          />
          <StyledTextField name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordsChange} type={passwords.showPassword ? 'text' : 'password'} label="Old password" variant="standard" />
          <StyledTextField name="newPassword" value={passwords.newPassword} onChange={handlePasswordsChange} type={passwords.showPassword ? 'text' : 'password'} label="New password" variant="standard" />
          <StyledTextField name="newPassword2" value={passwords.newPassword2} onChange={handlePasswordsChange} type={passwords.showPassword ? 'text' : 'password'} label="Repeat new password" variant="standard" />
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
