import { styled } from '../../stitches.config';

export const Checkbox = styled('input', {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0rem',
  left: '0rem',
  right: '0rem',
  bottom: '0rem',
  margin: '0rem',
  cursor: 'pointer',
  opacity: '0',
  zIndex: '2',
});

export const ToggleButton = styled('div', {
  position: 'relative',
  width: '4.5rem',
  height: '2.3rem',
  borderRadius: '1.24rem',

  '& span': {
    position: 'absolute',
    top: '0rem',
    right: '0rem',
    bottom: '0rem',
    left: '0rem',
    overflow: 'hidden',
    opacity: '1',
    backgroundColor: '#fff',
    boxShadow: '0rem 2px 25px #d9d9d9',
    borderRadius: '1.24rem',
    transition: '0.2s ease backgroundColor, 0.2s ease opacity',
  },
  '& span:before , span:after': {
    content: '',
    position: 'absolute',
    top: '0.25rem',
    width: '1.8rem',
    height: '1.8rem',
    borderRadius: '50%',
    transition: '0.5s ease transform, 0.2s ease backgroundColor',
  },

  '& span:before': {
    backgroundColor: '$fff',
    transform: 'translate(-1.8rem, 0rem)',
    zIndex: '1',
  },
  '& span:after': {
    backgroundColor: '$tertiaryColor',
    transform: 'translate(0.39rem, 0rem)',
    zIndex: '0',
  },
  '& input:checked + span': {
    backgroundColor: '$tertiaryColor',
  },
  '& input:active + span': {
    opacity: '0.5',
  },
  '& input:checked + span:before': {
    backgroundColor: '$tertiaryColor',
    transform: 'translate(1.74rem, -0.92rem)',
  },
  '& input:checked + span:after': {
    backgroundColor: '#fff',
    transform: 'translate(2.45rem, 0rem)',
  },
});
