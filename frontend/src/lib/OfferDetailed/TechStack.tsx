import React from 'react';
import { SkillInterface } from '../../utils/types';
import {
  LevelDot, LevelDotsContainer, MainContainer, SkillsContainer,
  SkillContainer, SkillName, SkillLevel, Title,
} from './TechStack.styled';

const SKILL_LEVEL_MAP = new Map([
  [1, 'nice to have'],
  [2, 'junior'],
  [3, 'regular'],
  [4, 'advanced'],
  [5, 'expert'],
]);

interface TechStackInterface {
  data: SkillInterface[]
}

function getDots(level : number) {
  const dots = [];
  for (let i = 0; i < SKILL_LEVEL_MAP.size; i += 1) {
    dots.push(<LevelDot full={i < level} />);
  }
  return dots;
}

function TechStack({ data } : TechStackInterface) {
  return (
    <MainContainer>
      <Title>Tech stack</Title>
      <SkillsContainer>
        {data?.sort((a, b) => b.level - a.level)
          .map((skill : SkillInterface) => (
            <SkillContainer key={skill.skillName}>
              <LevelDotsContainer>
                {getDots(skill.level)}
              </LevelDotsContainer>
              <SkillName>
                {skill.skillName}
              </SkillName>
              <SkillLevel>
                {SKILL_LEVEL_MAP.get(skill.level)}
              </SkillLevel>
            </SkillContainer>
          ))}
      </SkillsContainer>
    </MainContainer>
  );
}

export default TechStack;
