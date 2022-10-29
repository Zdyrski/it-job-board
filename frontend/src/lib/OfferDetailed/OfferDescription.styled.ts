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

export const ParserContainer = styled('div', {
  width: '100%',
  backgroundColor: '$primaryColor',
  padding: '1.2rem',
});

export const Title = styled('div', {
  width: '100%',
  borderBottom: '1px solid $tertiaryColor',
  padding: '1rem',
});
