import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export const ContractContainer = styled('div', {
  border: '2px solid $backgroundColor',
  background: '$tertiaryColor',
  borderRadius: '1rem',
  display: 'inline-block',
  padding: '0.5rem 1rem',
  margin: '0.1rem',
  color: '$secondaryColor',
});
