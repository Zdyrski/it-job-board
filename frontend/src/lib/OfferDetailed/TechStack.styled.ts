import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  backgroundColor: '$primaryColor',
  marginTop: '3rem',

  padding: '0.5rem',
  borderRadius: '0.5rem',
});

export const SkillsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  backgroundColor: '$primaryColor',

  padding: '0.5rem',
  borderRadius: '0.5rem',
});

export const Title = styled('div', {
  width: '100%',
  borderBottom: '1px solid $tertiaryColor',
  padding: '1rem',
});

export const SkillContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '19%',
  backgroundColor: '$primaryColor',
  margin: '0.2rem',
});

export const LevelDotsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SkillName = styled('div', {
  fontSize: '$text6',
  fontWeight: '$medium',
});

export const SkillLevel = styled('div', {
  fontSize: '$text7',
  fontWeight: '$light',
});

export const LevelDot = styled('div', {
  height: '0.9rem',
  width: '0.9rem',
  borderRadius: '50%',
  marginRight: '0.3rem',
  backgroundColor: '$tertiaryColor',

  variants: {
    full: {
      true: {
        background: '$violetColor',
      },
    },
  },
});
