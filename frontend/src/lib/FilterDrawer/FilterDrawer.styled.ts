import { Drawer } from '@mui/material';
import { styled } from '../stitches.config';

export const StyledDrawer = styled(Drawer, {
  '.MuiDrawer-paper': {
    padding: '1rem',
    backgroundColor: '$primaryColor',
    '@xs': {
      width: '70%',
    },
    '@md': {
      width: '50%',
    },
    '@lg': {
      width: '30%',
    },
  },
});

export const SkillAndRatingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});
