import { TextField } from '@mui/material';
import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  position: 'relative',
});

export const StyledTextField = styled(TextField, {
  '&.MuiTextField-root': {
    color: '$secondaryColor',
    '& .MuiInput-underline:after': {
      borderBottomColor: '$violetColor',
    },
    '& .MuiInput-input': {
      color: '$secondaryColor',
    },
    '& .MuiFormLabel-root': {
      color: '$violetColor',
    },
  },

});
