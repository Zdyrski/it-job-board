import { styled } from '../stitches.config';

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const BackgroundContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  '@xs': {
    width: '100%',
  },
  '@md': {
    width: '70%',
  },
  height: '100%',
  padding: '2rem',
  backgroundColor: '$tertiaryColor',
});

export const SubContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  '@xs': {
    width: '90%',
  },
  '@md': {
    width: '80%',
  },
  '@lg': {
    width: '60%',
  },
  backgroundColor: '$primaryColor',
  border: '0.2rem solid grey',
  borderRadius: '1rem',
  padding: '0 1rem',
  margin: '0.2rem',
});

export const Title = styled('div', {
  width: '100%',
  fontSize: '$text6',
  borderBottom: '1px solid $tertiaryColor',
  padding: '0.4rem',
});

export const TextInput = styled('input', {
  width: '100%',
  padding: '0.6rem',
  margin: '0.6rem',
});

export const CheckBoxInput = styled('input', {
  width: 'auto',
  padding: '0.6rem',
  margin: '0.6rem',
});

export const FlexRowContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row',
});

export const InputsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
});

export const MoneyContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '100%',
});

export const EditorContainer = styled('div', {
  height: 'auto',
});
