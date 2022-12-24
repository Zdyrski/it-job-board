/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  Radio, RadioGroup, FormControlLabel, Checkbox, Collapse, Autocomplete, createFilterOptions, Alert,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import _ from 'lodash';
import { getHeaders } from '../../utils/helperFunctions';
import OfferDataContext from '../../contexts/OfferDataContext';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import {
  MainContainer, SubContainer, Title, InputsContainer, BackgroundContainer, MoneyContainer, EditorContainer,
} from './OfferAdder.styled';
import TechStackAdder from './TechStackAdder';
import {
  COUNTRY_LIST, OFFER_MAX_TAGS_NUMBER, OFFER_MIN_TAGS_NUMBER, REGEX_OFFER_CITY, REGEX_OFFER_STREET, REGEX_OFFER_TITLE,
} from '../../utils/constants';
import MoneySlider from '../MoneySlider/MoneySlider';

const ADD_OFFER_URL = 'http://localhost:8080/offers';

const formats = [
  'background',
  'bold',
  'color',
  'font',
  'code',
  'italic',
  // 'link',
  'size',
  'strike',
  'script',
  'underline',
  'blockquote',
  'header',
  'indent',
  'list',
  'align',
  'direction',
  'code-block',
  // 'formula',
  // 'image'
  // 'video'
];

const initialErrorsState = {
  title: false,
  city: false,
  street: false,
  contracts: false,
  techStack: false,
  description: false,
};

function OfferAdder() {
  // TODO validation
  const {
    offerData,
    setOfferData,
    addressData,
    setAddressData,
    employmentContract,
    setEmploymentContract,
    mandateContract,
    setMndateContract,
    b2bContract,
    setB2bContract,
    otherContract,
    setOtherContract,
    techStack,
    setTechStack,
    description,
    setDescription,
  } = useContext(OfferDataContext);

  const [errorsState, setErrorsState] = useState(initialErrorsState);

  const handleOfferChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const getContractData = (contract: any) => ({
    name: contract.name,
    undisclosed: contract.undisclosed,
    minMoney: contract.undisclosed ? null : contract.money[0],
    maxMoney: contract.undisclosed ? null : contract.money[1],
  });

  const getContractsArray = () => {
    const result = [];
    if (employmentContract.checked) {
      result.push(getContractData(employmentContract));
    }
    if (mandateContract.checked) {
      result.push(getContractData(mandateContract));
    }
    if (b2bContract.checked) {
      result.push(getContractData(b2bContract));
    }
    if (otherContract.checked) {
      result.push(getContractData(otherContract));
    }
    return result;
  };

  const validateData = () => {
    if (!REGEX_OFFER_TITLE.test(offerData.title)) {
      setErrorsState((prev) => ({ ...prev, title: true }));
    } else {
      setErrorsState((prev) => ({ ...prev, title: false }));
    }
    if (!REGEX_OFFER_CITY.test(addressData.city)) {
      setErrorsState((prev) => ({ ...prev, city: true }));
    } else {
      setErrorsState((prev) => ({ ...prev, city: false }));
    }
    if (!REGEX_OFFER_STREET.test(addressData.street)) {
      setErrorsState((prev) => ({ ...prev, street: true }));
    } else {
      setErrorsState((prev) => ({ ...prev, street: false }));
    }
    if (getContractsArray().length === 0) {
      setErrorsState((prev) => ({ ...prev, contracts: true }));
    } else {
      setErrorsState((prev) => ({ ...prev, contracts: false }));
    }
    if (techStack.length < OFFER_MIN_TAGS_NUMBER || techStack.length > OFFER_MAX_TAGS_NUMBER) {
      setErrorsState((prev) => ({ ...prev, techStack: true }));
    } else {
      setErrorsState((prev) => ({ ...prev, techStack: false }));
    }
    if (description.length < 20 || description.length > 500) {
      setErrorsState((prev) => ({ ...prev, description: true }));
    } else {
      setErrorsState((prev) => ({ ...prev, description: false }));
    }
    if (_.isEqual(errorsState, initialErrorsState)) {
      return true;
    }
    return false;
  };

  const send = () => {
    if (!validateData()) {
      return;
    }

    const contractsArray = getContractsArray();
    const offerDataToSend = {
      title: offerData.title,
      address: addressData,
      remoteStatus: offerData.remoteWork,
      contracts: contractsArray,
      experienceLevel: offerData.expLevel,
      techStack,
      description,
    };
    console.log(offerDataToSend);

    const headers = getHeaders();
    console.log(headers);
    axios.post(ADD_OFFER_URL, offerDataToSend, { headers }).then((response) => {
      if (response.status === 201) {
        console.log(response);
        // localStorage.setItem('token', response.headers['token']);
        // setSuccessAlert();
        // setState(initialState);
        // setTimeout(() => navigate('/'), 2000);
      }
    }).catch((error) => {
      console.log(error);
      // setErrorAlert(error);
    });
  };

  return (
    <MainContainer>
      <BackgroundContainer>
        <SubContainer>
          <Title>
            Offer title *
          </Title>
          <StyledTextField
            name="title"
            error={errorsState.title}
            helperText={errorsState.title && 'Invalid entry.'}
            variant="standard"
            autoComplete="off"
            value={offerData.title}
            onChange={handleOfferChange}
          />
        </SubContainer>
        <SubContainer>
          <Title>
            Location *
          </Title>
          <Autocomplete
            freeSolo
            value={addressData.country}
            disableClearable
            filterOptions={createFilterOptions({ matchFrom: 'any', limit: 20 })}
            options={COUNTRY_LIST}
            onChange={(_e, newValue) => setAddressData({ ...addressData, country: newValue })}
            renderInput={(params) => (
              <StyledTextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Search input"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          <StyledTextField
            name="city"
            error={errorsState.city}
            helperText={errorsState.city && 'Invalid entry.'}
            label="City"
            variant="standard"
            autoComplete="off"
            value={addressData.city}
            onChange={handleAddressChange}
          />
          <StyledTextField
            name="street"
            error={errorsState.street}
            helperText={errorsState.street && 'Invalid entry.'}
            label="Street"
            variant="standard"
            autoComplete="off"
            value={addressData.street}
            onChange={handleAddressChange}
          />
        </SubContainer>
        <SubContainer>
          <Title>
            Remote work *
          </Title>
          <InputsContainer>
            <RadioGroup name="remoteWork" value={offerData.remoteWork} onChange={handleOfferChange}>
              <FormControlLabel value="NO" control={<Radio />} label="No" />
              <FormControlLabel value="PARTIAL" control={<Radio />} label="Partial" />
              <FormControlLabel value="FULL_TIME" control={<Radio />} label="Full time" />
            </RadioGroup>
          </InputsContainer>
        </SubContainer>
        <SubContainer>
          <Title>
            Type of contract * and salary(PLN)
          </Title>
          <InputsContainer>
            <FormControlLabel
              control={<Checkbox checked={employmentContract.checked} onChange={() => setEmploymentContract({ ...employmentContract, checked: !employmentContract.checked })} />}
              label="Contract of employment"
            />
            <Collapse in={employmentContract.checked}>
              <MoneyContainer>
                <MoneySlider disabled={employmentContract.undisclosed} value={employmentContract.money} setValue={setEmploymentContract} />
                <FormControlLabel
                  control={<Checkbox checked={employmentContract.undisclosed} onChange={() => setEmploymentContract({ ...employmentContract, undisclosed: !employmentContract.undisclosed })} />}
                  label="Undisclosed"
                />
              </MoneyContainer>
            </Collapse>
            <FormControlLabel
              control={<Checkbox checked={mandateContract.checked} onChange={() => setMndateContract({ ...mandateContract, checked: !mandateContract.checked })} />}
              label="Contract of mandate"
            />
            <Collapse in={mandateContract.checked}>
              <MoneyContainer>
                <MoneySlider disabled={mandateContract.undisclosed} value={mandateContract.money} setValue={setMndateContract} />
                <FormControlLabel
                  control={<Checkbox checked={mandateContract.undisclosed} onChange={() => setMndateContract({ ...mandateContract, undisclosed: !mandateContract.undisclosed })} />}
                  label="Undisclosed"
                />
              </MoneyContainer>
            </Collapse>
            <FormControlLabel
              control={<Checkbox checked={b2bContract.checked} onChange={() => setB2bContract({ ...b2bContract, checked: !b2bContract.checked })} />}
              label="B2B"
            />
            <Collapse in={b2bContract.checked}>
              <MoneyContainer>
                <MoneySlider disabled={b2bContract.undisclosed} value={b2bContract.money} setValue={setB2bContract} />
                <FormControlLabel
                  control={<Checkbox checked={b2bContract.undisclosed} onChange={() => setB2bContract({ ...b2bContract, undisclosed: !b2bContract.undisclosed })} />}
                  label="Undisclosed"
                />
              </MoneyContainer>
            </Collapse>
            <FormControlLabel
              control={<Checkbox name="other.checked" checked={otherContract.checked} onChange={() => setOtherContract({ ...otherContract, checked: !otherContract.checked })} />}
              label="Other"
            />
          </InputsContainer>
          <Collapse in={errorsState.contracts}>
            <Alert variant="outlined" severity="error">Pick at least 1 type of contract.</Alert>
          </Collapse>
        </SubContainer>
        <SubContainer>
          <Title>
            Exp level *
          </Title>
          <InputsContainer>
            <RadioGroup name="expLevel" value={offerData.expLevel} onChange={handleOfferChange}>
              <FormControlLabel value="INTERN" control={<Radio />} label="Intern" />
              <FormControlLabel value="JUNIOR" control={<Radio />} label="Junior" />
              <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
              <FormControlLabel value="SENIOR" control={<Radio />} label="Senior" />
              <FormControlLabel value="EXPERT" control={<Radio />} label="Expert" />
            </RadioGroup>
          </InputsContainer>
        </SubContainer>
        <TechStackAdder errorsState={errorsState.techStack} techStack={techStack} setTechStack={setTechStack} />
        <SubContainer>
          <Title>
            Offer Description *
          </Title>
          <EditorContainer>
            <ReactQuill
              theme="snow"
              style={{ height: 'auto' }}
              formats={formats}
              value={description}
              onChange={setDescription}
            />
          </EditorContainer>
          <Collapse in={errorsState.description}>
            <Alert variant="outlined" severity="error">Number of characters needs to be between 20 and 500.</Alert>
          </Collapse>
        </SubContainer>
        <GlitchedButton placeholder="Send to approve" onClick={send} />
      </BackgroundContainer>
    </MainContainer>
  );
}

export default OfferAdder;
