import { TextField } from '@mui/material';
import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  position: 'relative',
});

export const StyledTextField = styled(TextField, {
  '&.MuiTextField-root': {
    margin: '0.5rem 0',
    color: '$secondaryColor',
    '& .MuiInput-underline:after': {
      borderBottomColor: '$violetColor',
    },
    '& .Mui-error.MuiInput-underline:after': {
      borderBottomColor: 'red',
    },
    '& .MuiInput-input': {
      color: '$secondaryColor',
    },
    '& .MuiFormLabel-root': {
      color: '$violetColor',
    },
  },
});
