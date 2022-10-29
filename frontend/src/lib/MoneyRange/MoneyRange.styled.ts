import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '$primaryColor',
  border: '0.2rem solid red',
});

export const Salary = styled('div', {
  color: '$salaryColor',
});
