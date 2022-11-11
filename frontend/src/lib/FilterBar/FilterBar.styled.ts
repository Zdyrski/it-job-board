import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  height: '50%',
  backgroundColor: '$primaryColor',
});

export const Logo = styled('div', {
  color: '$secondaryColor',
  fontSize: '$text2',
});

export const Icon = styled('div', {
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1rem',
});

export const IconAndText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.7rem',
  cursor: 'pointer',
});
