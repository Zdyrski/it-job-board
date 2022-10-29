import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  zIndex: '1',
  top: '0',
  width: '100%',
  backgroundColor: '$primaryColor',
  borderBottom: '0.2rem solid $secondaryColor',
  variants: {
    filterBar: {
      on: {
        height: '10vh',
      },
      off: {
        height: '5vh',
      },
    },
  },
});

export const MainRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '$primaryColor',
  borderBottom: '0.2rem solid $secondaryColor',
  variants: {
    filterBar: {
      on: {
        height: '50%',
      },
      off: {
        height: '100%',
      },
    },
  },
});

export const Logo = styled('div', {
  color: '$secondaryColor',
  fontSize: '$text2',
  cursor: 'pointer',
});
