import React from 'react';
import { SkillInterface } from '../../types';
import {
  LevelDot, LevelDotsContainer, MainContainer, SkillsContainer,
  SkillContainer, SkillName, SkillLevel, Title,
} from './TechStack.styled';

const TEST_TECH_STACK = [{ skillName: 'Java', level: 1 }, { skillName: 'Testing', level: 3 }, { skillName: 'Debugging', level: 5 }, { skillName: 'Spring', level: 4 }, { skillName: 'Debugging', level: 5 }, { skillName: 'Spring', level: 4 }, { skillName: 'Debugging', level: 5 }, { skillName: 'Spring', level: 4 }, { skillName: 'Debugging', level: 5 }, { skillName: 'Spring', level: 4 }];

const SKILL_LEVEL_MAP = new Map([
  [1, 'nice to have'],
  [2, 'junior'],
  [3, 'regular'],
  [4, 'advanced'],
  [5, 'expert'],
]);

function getDots(level : number) {
  const dots = [];
  for (let i = 0; i < SKILL_LEVEL_MAP.size; i += 1) {
    dots.push(<LevelDot full={i < level} />);
  }
  return dots;
}

function TechStack() {
  return (
    <MainContainer>
      <Title>Tech stack</Title>
      <SkillsContainer>
        {TEST_TECH_STACK.sort((a, b) => b.level - a.level)
          .map((skill : SkillInterface) => (
            <SkillContainer>
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
