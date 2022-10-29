import React from 'react';
import { GlitchedButtonStyled } from './GlitchedButton.styled';

export interface Props {
  placeholder: string
  onClick?: () => void
}

function GlitchedButton({ placeholder, onClick } : Props) {
  return (
    <GlitchedButtonStyled name={placeholder} onClick={onClick}>{placeholder}</GlitchedButtonStyled>
  );
}

GlitchedButton.defaultProps = {
  onClick: undefined,
};
export default GlitchedButton;
