import { styled } from '../stitches.config';

export const PageContainer = styled('div', {
  display: 'flex',
  width: '100%',
  height: '80vh',
  justifyContent: 'center',
  alignItems: 'center',
});

export const FormContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40%',
  padding: '2rem',
  border: '0.2rem solid $tertiaryColor',
  borderRadius: '0.5rem',
});
