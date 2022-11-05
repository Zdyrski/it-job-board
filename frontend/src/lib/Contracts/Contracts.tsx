import React from 'react';
import { ContractInterface } from '../../types';
import { MainContainer, ContractContainer } from './Contracts.styled';

interface ContractsInterface {
    data: ContractInterface[]
  }

function Contracts({ data } : ContractsInterface) {
  return (
    <MainContainer>
      {data?.map((contract : ContractInterface) => (
        !contract.salaryUndisclosed
          ? (
            <ContractContainer key={contract.name}>
              {contract.name}
              {' '}
              Undisclosed
            </ContractContainer>
          )
          : (
            <ContractContainer key={contract.name}>
              {contract.name}
              {' '}
              {contract.minMoney}
              -
              {contract.maxMoney}
              {' '}
              PLN
            </ContractContainer>
          )
      ))}
    </MainContainer>
  );
}

export default Contracts;
