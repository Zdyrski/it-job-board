/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  Radio, RadioGroup, FormControlLabel, Checkbox, Collapse,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getHeaders } from '../../constants';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import {
  MainContainer, SubContainer, Title, InputsContainer, BackgroundContainer, MoneyContainer, EditorContainer,
} from './OfferAdder.styled';
import TechStackAdder from './TechStackAdder';

const initialData = {
  title: '',
  remoteWork: 'No',
  expLevel: 'Intern',
};

const initialAddressData = {
  country: 'Poland',
  city: '',
  street: '',
};

const initialContractsData = {
  employment: {
    checked: false,
    undisclosed: true,
    minMoney: 0,
    maxMoney: 0,
  },
  mandate: {
    checked: false,
    undisclosed: true,
    minMoney: 0,
    maxMoney: 0,
  },
  B2B: {
    checked: false,
    undisclosed: true,
    minMoney: 0,
    maxMoney: 0,
  },
  other: {
    checked: false,
    undisclosed: true,
    minMoney: 0,
    maxMoney: 0,
  },
};

const ADD_OFFER_URL = 'http://localhost:8080/offers/add-offer';

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

function OfferAdder() {
  // TODO validation
  const [offerData, setOfferData] = useState(initialData);
  const [addressData, setAddressData] = useState(initialAddressData);
  const [contractsData, setContractsData] = useState(initialContractsData);
  const [techStack, setTechStack] = useState([]);
  const [description, setDescription] = useState('');

  const handleOfferChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleContractChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const contractType = e.target.name.split('.').at(0);
    const fieldType = e.target.name.split('.').at(1);
    if (contractType !== undefined && fieldType !== undefined) {
      if (fieldType === 'checked' || fieldType === 'undisclosed') {
        setContractsData({ ...contractsData, [contractType]: { ...(contractsData as any)[contractType], [fieldType]: !(contractsData as any)[contractType][fieldType] } });
      } else {
        setContractsData({ ...contractsData, [contractType]: { ...(contractsData as any)[contractType], [fieldType]: e.target.value } });
      }
    }
  };
  const getContractsArray = () => Object.entries(contractsData).filter(([key, value]) => value.checked).map(([key, value]) => ({
    name: key,
    undisclosed: value.undisclosed,
    minMoney: value.minMoney,
    maxMoney: value.maxMoney,
  }));

  const send = () => {
    const contractsArray = getContractsArray();
    const offerDataToSend = {
      title: offerData.title,
      address: addressData,
      remote: offerData.remoteWork,
      contracts: contractsArray,
      experienceLevel: offerData.expLevel,
      techStack,
      description,
    };
    console.log(offerDataToSend);

    const headers = getHeaders();
    console.log(headers);
    axios.post(ADD_OFFER_URL, offerDataToSend, { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        // sessionStorage.setItem('jwt-token', response.headers['jwt-token']);
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
          <StyledTextField name="title" variant="standard" value={offerData.title} onChange={handleOfferChange} />
        </SubContainer>
        <SubContainer>
          <Title>
            Location *
          </Title>
          <StyledTextField name="country" label="Country" variant="standard" value={addressData.country} onChange={handleAddressChange} />
          <StyledTextField name="city" label="City" variant="standard" value={addressData.city} onChange={handleAddressChange} />
          <StyledTextField name="street" label="Street" variant="standard" value={addressData.street} onChange={handleAddressChange} />
        </SubContainer>
        <SubContainer>
          <Title>
            Remote work *
          </Title>
          <InputsContainer>
            <RadioGroup name="remoteWork" value={offerData.remoteWork} onChange={handleOfferChange}>
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel value="Partial" control={<Radio />} label="Partial" />
              <FormControlLabel value="Full time" control={<Radio />} label="Full time" />
            </RadioGroup>
          </InputsContainer>
        </SubContainer>
        <SubContainer>
          <Title>
            Type of contract * and salary(PLN)
          </Title>
          <InputsContainer>
            <FormControlLabel
              control={<Checkbox name="employment.checked" checked={contractsData.employment.checked} onChange={handleContractChange} />}
              label="Contract of employment"
            />
            <Collapse in={contractsData.employment.checked}>
              <MoneyContainer>
                <StyledTextField
                  disabled={contractsData.employment.undisclosed}
                  name="employment.minMoney"
                  label="Min"
                  variant="standard"
                  value={contractsData.employment.minMoney}
                  onChange={handleContractChange}
                />
                <StyledTextField
                  disabled={contractsData.employment.undisclosed}
                  name="employment.maxMoney"
                  label="Max"
                  variant="standard"
                  value={contractsData.employment.maxMoney}
                  onChange={handleContractChange}
                />
                <FormControlLabel
                  control={<Checkbox name="employment.undisclosed" checked={contractsData.employment.undisclosed} onChange={handleContractChange} />}
                  label="Undisclosed"
                />
              </MoneyContainer>
            </Collapse>
            <FormControlLabel
              control={<Checkbox name="mandate.checked" checked={contractsData.mandate.checked} onChange={handleContractChange} />}
              label="Contract of mandate"
            />
            <Collapse in={contractsData.mandate.checked}>
              <MoneyContainer>
                <StyledTextField
                  disabled={contractsData.mandate.undisclosed}
                  name="mandate.minMoney"
                  label="Min"
                  variant="standard"
                  value={contractsData.mandate.minMoney}
                  onChange={handleContractChange}
                />
                <StyledTextField
                  disabled={contractsData.mandate.undisclosed}
                  name="mandate.maxMoney"
                  label="Max"
                  variant="standard"
                  value={contractsData.mandate.maxMoney}
                  onChange={handleContractChange}
                />
                <FormControlLabel
                  control={<Checkbox name="mandate.undisclosed" checked={contractsData.mandate.undisclosed} onChange={handleContractChange} />}
                  label="Undisclosed"
                />
              </MoneyContainer>
            </Collapse>
            <FormControlLabel
              control={<Checkbox name="B2B.checked" checked={contractsData.B2B.checked} onChange={handleContractChange} />}
              label="B2B"
            />
            <Collapse in={contractsData.B2B.checked}>
              <MoneyContainer>
                <StyledTextField
                  disabled={contractsData.B2B.undisclosed}
                  name="B2B.minMoney"
                  label="Min"
                  variant="standard"
                  value={contractsData.B2B.minMoney}
                  onChange={handleContractChange}
                />
                <StyledTextField
                  disabled={contractsData.B2B.undisclosed}
                  name="B2B.maxMoney"
                  label="Max"
                  variant="standard"
                  value={contractsData.B2B.maxMoney}
                  onChange={handleContractChange}
                />
                <FormControlLabel
                  control={<Checkbox name="B2B.undisclosed" checked={contractsData.B2B.undisclosed} onChange={handleContractChange} />}
                  label="Undisclosed"
                />
              </MoneyContainer>
            </Collapse>
            <FormControlLabel
              control={<Checkbox name="other.checked" checked={contractsData.other.checked} onChange={handleContractChange} />}
              label="Other"
            />
          </InputsContainer>
        </SubContainer>
        <SubContainer>
          <Title>
            Exp level *
          </Title>
          <InputsContainer>
            <RadioGroup name="expLevel" value={offerData.expLevel} onChange={handleOfferChange}>
              <FormControlLabel value="Intern" control={<Radio />} label="Intern" />
              <FormControlLabel value="Junior" control={<Radio />} label="Junior" />
              <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="Senior" control={<Radio />} label="Senior" />
              <FormControlLabel value="Expert" control={<Radio />} label="Expert" />
            </RadioGroup>
          </InputsContainer>
        </SubContainer>
        <TechStackAdder techStack={techStack} setTechStack={setTechStack} />
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
        </SubContainer>
        <GlitchedButton placeholder="Send to approve" onClick={send} />
      </BackgroundContainer>
    </MainContainer>
  );
}

export default OfferAdder;
