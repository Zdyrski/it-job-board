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
