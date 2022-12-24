import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControlLabel, IconButton, Radio, RadioGroup, Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import FormButton from '../Buttons/FormButton/FormButton';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { FormContainer, PageContainer, SubContainer } from './SignInAndUp.styled';
import AlertsComponent from '../AlertsComponent/AlertsComponent';
import UpdateableLogo from '../CompanyLogo/UpdateableLogo';
import {
  REGEX_COMPANY_LOGO_URL, REGEX_COMPANY_NAME, REGEX_COMPANY_SITE_URL,
  REGEX_EMAIL, REGEX_NAME, REGEX_PASSWORD,
} from '../../utils/constants';

const SIGN_UP_URL = 'http://localhost:8080/users/register';

const initialState = {
  email: '',
  password1: '',
  password2: '',
  role: 'ROLE_EMPLOYEE',
  firstName: '',
  lastName: '',
  companyName: '',
  companySiteUrl: '',
  companySize: 0,
  companyLogoUrl: '',
  showPassword: false,
};

const initialErrorsState = {
  email: false,
  password1: false,
  password2: false,
  firstName: false,
  lastName: false,
  companyName: false,
  companySiteUrl: false,
  companySize: false,
  companyLogoUrl: false,
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
  const [errorsState, setErrorsState] = useState(initialErrorsState);
  const [logoSrc, setLogoSrc] = useState('');
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

  const validateData = () => {
    const tempErrorState = _.clone(initialErrorsState);

    if (state.role === 'ROLE_EMPLOYEE') {
      if (!REGEX_NAME.test(state.firstName)) {
        tempErrorState.firstName = true;
      }
      if (!REGEX_NAME.test(state.lastName)) {
        tempErrorState.lastName = true;
      }
    } else if (state.role === 'ROLE_EMPLOYER') {
      if (!REGEX_COMPANY_NAME.test(state.companyName)) {
        tempErrorState.companyName = true;
      }
      if (!REGEX_COMPANY_SITE_URL.test(state.companySiteUrl)) {
        tempErrorState.companySiteUrl = true;
      }
      if (state.companySize > 0 && state.companySize < 100000000) {
        tempErrorState.companySize = true;
      }
      if (!REGEX_COMPANY_LOGO_URL.test(state.companyLogoUrl)) {
        tempErrorState.companyLogoUrl = true;
      }
    }
    if (!REGEX_EMAIL.test(state.email)) {
      tempErrorState.email = true;
    }
    if (!REGEX_PASSWORD.test(state.password1) || !REGEX_PASSWORD.test(state.password2)) {
      tempErrorState.password1 = true;
      tempErrorState.password2 = true;
    }
    if (state.password1 !== state.password2) {
      tempErrorState.password1 = true;
      tempErrorState.password2 = true;
    }
    setErrorsState(tempErrorState);
    console.log(tempErrorState);
    if (_.isEqual(tempErrorState, initialErrorsState)) {
      return true;
    }
    return false;
  };

  const getSignUpData = () => {
    switch (state.role) {
      case 'ROLE_EMPLOYEE':
        return {
          email: state.email,
          password: state.password1,
          role: state.role,
          firstName: state.firstName,
          lastName: state.lastName,
        };
      case 'ROLE_EMPLOYER':
        return {
          email: state.email,
          password: state.password1,
          role: state.role,
          companyName: state.companyName,
          companySiteUrl: state.companySiteUrl,
          companySize: state.companySize,
          companyLogoUrl: state.companyLogoUrl,
        };
      default:
        return null;
    }
  };

  const handleSignUp = () => {
    if (!validateData()) {
      console.log('NOT EQ');
      return;
    }

    const signUpData = getSignUpData();
    console.log(signUpData);
    if (signUpData === null) {
      return;
    }
    axios.post(SIGN_UP_URL, signUpData).then((response) => {
      if (response.status === 201) {
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

  const employeeInputs = (
    <SubContainer>
      <StyledTextField
        name="firstName"
        autoComplete="off"
        error={errorsState.firstName}
        value={state.firstName}
        onChange={handleChange}
        label="First name *"
        variant="standard"
      />
      <StyledTextField
        name="lastName"
        autoComplete="off"
        error={errorsState.lastName}
        value={state.lastName}
        onChange={handleChange}
        label="Last name *"
        variant="standard"
      />
    </SubContainer>
  );

  const employerInputs = (
    <SubContainer>
      <StyledTextField
        name="companyName"
        autoComplete="off"
        error={errorsState.companyName}
        value={state.companyName}
        onChange={handleChange}
        label="Company name *"
        variant="standard"
      />
      <Tooltip title="Your Site URL should begin with http(s)">
        <StyledTextField
          name="companySiteUrl"
          autoComplete="off"
          error={errorsState.companySiteUrl}
          value={state.companySiteUrl}
          onChange={handleChange}
          label="Company site URL *"
          variant="standard"
        />
      </Tooltip>
      <StyledTextField
        name="companySize"
        autoComplete="off"
        error={errorsState.companySize}
        value={state.companySize}
        type="number"
        onChange={handleChange}
        label="Company size *"
        variant="standard"
      />
      <Tooltip title="Your Logo URL should begin with http(s) and end with .jpg/jpeg/png/svg">
        <StyledTextField
          name="companyLogoUrl"
          autoComplete="off"
          error={errorsState.companyLogoUrl}
          value={state.companyLogoUrl}
          onChange={handleChange}
          helperText="(Preferably 1:1 ratio)"
          label="Company logo URL *"
          variant="standard"
        />
      </Tooltip>
      <Button type="button" onClick={() => setLogoSrc(state.companyLogoUrl)}>Test Logo</Button>
      <UpdateableLogo src={logoSrc} setSrc={setLogoSrc} />
    </SubContainer>
  );

  return (
    <PageContainer>
      <FormContainer>
        <AlertsComponent
          openError={responseState.openError}
          openSuccess={responseState.openSuccess}
          errorMessage={responseState.errorMessage}
          successMessage={responseState.successMessage}
        />
        {{
          ROLE_EMPLOYEE: employeeInputs,
          ROLE_EMPLOYER: employerInputs,
        }[state.role]}
        <StyledTextField
          name="email"
          autoComplete="off"
          error={errorsState.email}
          value={state.email}
          onChange={handleChange}
          label="E-mail *"
          variant="standard"
        />
        <Tooltip title="Min 8 characters: at least one BIG letter, one small, one digit.">
          <StyledTextField
            name="password1"
            error={errorsState.password1}
            value={state.password1}
            onChange={handleChange}
            type={state.showPassword ? 'text' : 'password'}
            label="Password *"
            variant="standard"
          />
        </Tooltip>
        <Tooltip title="Min 8 characters: at least one BIG letter, one small, one digit.">
          <StyledTextField
            name="password2"
            error={errorsState.password2}
            value={state.password2}
            onChange={handleChange}
            type={state.showPassword ? 'text' : 'password'}
            label="Repeat password *"
            variant="standard"
          />
        </Tooltip>
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
