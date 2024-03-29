import { Autocomplete } from '@mui/material';
import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const SkillAndRatingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const StyledAutocomplete = styled(Autocomplete, {
  '.MuiAutocomplete-paper': {
    backgroundColor: '$violetColor',
    color: '$violetColor',
  },
});
