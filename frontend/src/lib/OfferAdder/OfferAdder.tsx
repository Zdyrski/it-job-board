/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  TextField, Radio, RadioGroup, FormControlLabel,
} from '@mui/material';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import GlitchedButton from '../Buttons/GlitchedButton/GlitchedButton';
import { StyledTextField } from '../Inputs/Inputs.styled';
import {
  MainContainer, SubContainer, Title, InputsContainer, BackgroundContainer, MoneyContainer, EditorContainer,
} from './OfferAdder.styled';

const initialData = {
  title: '',
  location: '',
  remoteWork: 'No',
  minMoney: 0,
  maxMoney: 0,
  typeOfContract: 'Contract of employment',
  expLevel: 'Intern',
};

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
  const [offerData, setOfferData] = useState(initialData);
  const [description, setDescription] = useState('');

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  };

  const send = () => {
    console.log(offerData);
    console.log(description);
  };

  return (
    <MainContainer>
      <BackgroundContainer>
        <SubContainer>
          <Title>
            Offer title *
          </Title>
          <StyledTextField name="title" variant="standard" value={offerData.title} onChange={handleChange} />
        </SubContainer>
        <SubContainer>
          <Title>
            Location *
          </Title>
          <StyledTextField name="location" variant="standard" value={offerData.location} onChange={handleChange} />
        </SubContainer>
        <SubContainer>
          <Title>
            Remote work *
          </Title>
          <InputsContainer>
            <RadioGroup name="remoteWork" value={offerData.remoteWork} onChange={handleChange}>
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel value="Partial" control={<Radio />} label="Partial" />
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </InputsContainer>
        </SubContainer>
        <SubContainer>
          <Title>
            Money range *
          </Title>
          <MoneyContainer>
            <StyledTextField name="minMoney" label="Min" variant="standard" value={offerData.minMoney} onChange={handleChange} />
            <StyledTextField name="maxMoney" label="Max" variant="standard" value={offerData.maxMoney} onChange={handleChange} />
          </MoneyContainer>
        </SubContainer>
        <SubContainer>
          <Title>
            Type of contract *
          </Title>
          <InputsContainer>
            <RadioGroup name="typeOfContract" value={offerData.typeOfContract} onChange={handleChange}>
              <FormControlLabel value="Contract of employment" control={<Radio />} label="Contract of employment" />
              <FormControlLabel value="Contract of mandate" control={<Radio />} label="Contract of mandate" />
              <FormControlLabel value="B2B" control={<Radio />} label="B2B" />
            </RadioGroup>
          </InputsContainer>
        </SubContainer>
        <SubContainer>
          <Title>
            Exp level *
          </Title>
          <InputsContainer>
            <RadioGroup name="expLevel" value={offerData.expLevel} onChange={handleChange}>
              <FormControlLabel value="Intern" control={<Radio />} label="Intern" />
              <FormControlLabel value="Junior" control={<Radio />} label="Junior" />
              <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="Senior" control={<Radio />} label="Senior" />
              <FormControlLabel value="Expert" control={<Radio />} label="Expert" />
            </RadioGroup>
          </InputsContainer>
        </SubContainer>
        <SubContainer>
          <Title>
            Tech stack (at least 3)*
          </Title>
          <InputsContainer />
        </SubContainer>
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
