import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background-color: white;
  height: 48px;
  padding: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const CloseButton = styled.button`
  font-family: sans-serif;
  font-size: 24px;
  padding: 12px;
  background: none;
  border: none;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:active {
    border-radius: 12%;
    background-color: rgb(240, 240, 240);
  }
`;

const Title = styled.span`
  font-weight: 400;
  font-size: 24px;
  padding-left: 24px;
`;


export default ({ onClose }) => (
  <HeaderWrapper>
    <CloseButton onClick={onClose} >&#x2715;</CloseButton>
    <Title>Exchange</Title>
  </HeaderWrapper>
);
