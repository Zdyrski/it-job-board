import { styled } from '../stitches.config';

export const ListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '90%',
  height: '100%',
  overflowY: 'scroll',
  overflowX: 'hidden',
  backgroundColor: '$tertiaryColor',

  // DISABLE SCROLLBAR
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const MainContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '95%',
  backgroundColor: '$primaryColor',
  margin: '0.2rem',
});
