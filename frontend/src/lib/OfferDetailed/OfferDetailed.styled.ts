import { Alert } from '@mui/material';
import { styled } from '../stitches.config';

export const ListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  height: '100%',
  backgroundColor: '$tertiaryColor',
});

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '$primaryColor',
  margin: '0.2rem',
});

export const ApplyAlert = styled(Alert, {
  margin: '1rem',
});
