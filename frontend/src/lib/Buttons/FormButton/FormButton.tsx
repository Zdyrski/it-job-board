import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormButtonStyled } from './FormButton.styled';

export interface Props {
  placeholder: string
  navigateTo: string
}

function FormButton({ placeholder, navigateTo } : Props) {
  const navigate = useNavigate();

  return (
    <FormButtonStyled name={placeholder} onClick={() => navigate(`${navigateTo}`)}>{placeholder}</FormButtonStyled>
  );
}

export default FormButton;
