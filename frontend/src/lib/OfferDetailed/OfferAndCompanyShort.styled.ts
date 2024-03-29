import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  borderRadius: '0 0 0.6rem 0.6rem',
  padding: '2rem 1rem 0rem 1rem',
  backgroundColor: '$violetColor',
});

export const LogoAndDetailsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const DetailsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  padding: '0rem 2rem',
});

export const Title = styled('div', {
  fontSize: '2rem',
});
