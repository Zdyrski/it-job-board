import { Drawer } from '@mui/material';
import { styled } from '../stitches.config';

export const StyledDrawer = styled(Drawer, {
  '.MuiDrawer-paper': {
    padding: '0 1rem',
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

export const FilterSection = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem 1rem',
  borderBottom: '1px solid $violetColor',
  width: '100%',
});
