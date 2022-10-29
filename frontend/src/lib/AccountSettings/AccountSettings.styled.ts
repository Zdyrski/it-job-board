import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const BackgroundContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  '@xs': {
    width: '100%',
  },
  '@md': {
    width: '70%',
  },
  height: '100%',
  padding: '2rem',
  backgroundColor: '$tertiaryColor',
});

export const SubContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '@xs': {
    width: '90%',
  },
  '@md': {
    width: '80%',
  },
  '@lg': {
    width: '70%',
  },
  '@xl': {
    width: '60%',
  },
  backgroundColor: '$primaryColor',
  border: '0.2rem solid grey',
  borderRadius: '1rem',
  padding: '0 1rem',
  margin: '0.2rem',
});

export const Title = styled('div', {
  width: '100%',
  fontSize: '$text6',
  borderBottom: '1px solid $tertiaryColor',
  padding: '0.4rem',
});

export const DetailRowContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});
