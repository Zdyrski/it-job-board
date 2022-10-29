import { keyframes, styled } from '../../stitches.config';

const glitch = keyframes({
  '0%': {
    clipPath: 'inset(80% -6px 0 0)',
    transform: 'translate(-20px, -10px)',
  },
  '2%': {
    clipPath: 'inset(10% -6px 85% 0)',
    transform: 'translate(10px, 10px)',
  },
  '4%': {
    clipPath: 'inset(80% -6px 0 0)',
    transform: 'translate(-10px, 10px)',
  },
  '6%': {
    clipPath: 'inset(10% -6px 85% 0)',
    transform: 'translate(0px, 5px)',
  },
  '8%': {
    clipPath: 'inset(50% 50% 50% 50%)',
    transform: 'translate(-5px, 0px)',
  },
  '10%': {
    clipPath: 'inset(10% -6px 85% 0)',
    transform: 'translate(5px, 0px)',
  },
  '12%': {
    clipPath: 'inset(40% -6px 43% 0)',
    transform: 'translate(5px, 10px)',
  },
  '14%': {
    clipPath: 'insetinset(50% -6px 30% 0)',
    transform: 'translate(-10px, 10px)',
  },
  '16%': {
    clipPath: 'inset(80% -6px 5% 0)',
    transform: 'translate(20px, -10px)',
  },
  '18%': {
    clipPath: 'inset(80% -6px 0 0)',
    transform: 'translate(-10px, 0px)',
  },
  '20%': {
    clipPath: 'inset(80% -6px 0 0)',
    transform: 'translate(0)',
  },
  '20%-100%': {
    clipPath: 'inset(80% -6px 0 0)',
    transform: 'translate(0)',
  },
});

export const GlitchedButtonStyled = styled('button', {
  position: 'relative',
  margin: '1rem',
  padding: '1rem 2rem',
  border: '0',
  fontSize: '$text4',
  fontFamily: 'sans-serif',
  color: 'White',
  background: 'linear-gradient(45deg, transparent 5%, $violetColor 5%)',
  boxShadow: '6px 0px 0px #00E6F6',
  transition: '500ms ease-in-out',

  '&::after': {
    position: 'absolute',
    padding: '1rem 2rem',
    border: '0',
    fontSize: '$text4',
    fontFamily: 'sans-serif',
    color: 'White',
    background: 'linear-gradient(45deg, transparent 5%, $violetColor 5%)',
    boxShadow: '6px 0px 0px #00E6F6',
    content: 'attr(name)',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    transition: '500ms ease-in-out',
    display: 'block',
    textShadow: '-3px -3px 0px #F8F005, 3px 3px 0px #00E6F6',
    clipPath: 'inset(50% 50% 50% 50%)',
  },

  '&:hover::after': {
    animation: `5s ${glitch}`,
    animationIterationCount: 'infinite',
  },
});

export const Nothing = styled('div', {

});
