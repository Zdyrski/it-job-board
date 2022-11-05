import {
  DeleteOutline, Add,
} from '@mui/icons-material';
import {
  Autocomplete, IconButton, Rating,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SkillInterface, TechStackInterface } from '../../types';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { LevelDot } from '../OfferDetailed/TechStack.styled';
import { SubContainer, Title, InputsContainer } from './OfferAdder.styled';
import { MainContainer, SkillAndRatingContainer } from './TechStackAdder.styled';

const TAGS_URL = 'http://localhost:8080/offers/tags';

const SKILL_LEVEL_MAP = new Map([
  [1, 'nice to have'],
  [2, 'junior'],
  [3, 'regular'],
  [4, 'advanced'],
  [5, 'expert'],
]);

const initialSkillLvl = 3;

function TechStackAdder({ techStack, setTechStack }: TechStackInterface) {
  // TODO call to tags api
  const [newSkillName, setNewSkillName] = useState<string | undefined>('');
  const [newSkillLvl, setNewSkillLvl] = useState<number | null>(initialSkillLvl);
  const [options, setOptions] = useState<string[]>([]);
  const [hoverSkillLvl, setHoverSkillLvl] = useState(-1);

  const addNewSkill = () => {
    if (techStack.find(({ skillName }) => skillName === newSkillName) || newSkillName === '') {
      return;
    }
    const updatedTechStack = [...techStack, { skillName: newSkillName, level: newSkillLvl }];
    setTechStack(updatedTechStack);
    setOptions(options.filter((option) => option !== newSkillName));
    setNewSkillName('');
  };

  const deleteSkill = (skillName : string) => {
    const updatedTechStack = techStack.filter((skill) => skill.skillName !== skillName);
    setTechStack(updatedTechStack);
    setOptions([...options, skillName]);
  };

  useEffect(() => {
    axios.get(TAGS_URL).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setOptions(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <SubContainer>
      <Title>
        Tech stack (at least 3)*
      </Title>
      {techStack.map((skill : SkillInterface) => (
        <MainContainer key={skill.skillName}>
          <SkillAndRatingContainer>
            {skill.skillName}
            <Rating
              readOnly
              value={skill.level}
              icon={<LevelDot full />}
              emptyIcon={<LevelDot full={false} />}
            />
          </SkillAndRatingContainer>
          <IconButton onClick={() => deleteSkill(skill.skillName)}><DeleteOutline /></IconButton>
        </MainContainer>
      ))}
      <div>
        <Autocomplete
          freeSolo
          value={newSkillName}
          disableClearable
          options={options}
          onChange={(_e, newValue) => setNewSkillName(newValue)}
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
        <SkillAndRatingContainer>
          <Rating
            value={newSkillLvl}
            precision={1}
            icon={<LevelDot full />}
            emptyIcon={<LevelDot full={false} />}
            onChange={(_event, newValue) => {
              setNewSkillLvl(newValue);
            }}
            onChangeActive={(_event, newHover) => {
              setHoverSkillLvl(newHover);
            }}
          />
          {newSkillLvl !== null && (
            <div>
              {SKILL_LEVEL_MAP.get(hoverSkillLvl !== -1 ? hoverSkillLvl : newSkillLvl)}
            </div>
          )}
          <IconButton onClick={addNewSkill}><Add /></IconButton>
        </SkillAndRatingContainer>
      </div>
      <InputsContainer />
    </SubContainer>
  );
}

export default TechStackAdder;
