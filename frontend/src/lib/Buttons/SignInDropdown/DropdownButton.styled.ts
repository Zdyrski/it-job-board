import { styled } from '../../stitches.config';

export const MenuContent = styled('div', {
  position: 'absolute',
  right: '0rem',
  top: '100%',
  display: 'none',
  width: '100%',
});

export const Menu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',
  fontSize: '$text3',
  height: '100%',
  padding: '0 4rem',
  color: '$secondaryColor',
  borderLeft: '0.2rem solid $secondaryColor',
  borderRight: '0.2rem solid $secondaryColor',

  '&:hover': {
    backgroundColor: '$tertiaryColor',
    [`& ${MenuContent}`]: {
      display: 'block',
    },
  },
});

export const MenuItem = styled('a', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.4rem',
  textAlign: 'center',
  color: '$secondaryColor',
  backgroundColor: '$primaryColor',
  textDecoration: 'none',
  border: '0.2rem solid $secondaryColor',
  borderTop: '0',
  wordWrap: 'nowrap',

  '&:hover': {
    backgroundColor: '$tertiaryColor',
  },
});
