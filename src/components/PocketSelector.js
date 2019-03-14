import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Balance = styled.span`
  padding-top: 6px;
  color: ${props => (props.warning ? 'rgb(235, 0, 141)' : 'rgb(150, 150, 150)')};
  font-size: 12px;
`;

const Select = styled.select`
  width: 100px;
  height: 50px;
  background-color: white;
  font-size: 24px;
`;

const PocketSelector = ({
  pockets,
  value,
  warning,
  ignoredValue,
  onChange,
}) => (
  <Wrapper>
    <Select
      onChange={({ target }) => onChange(target.value)}
      value={value}>
      {Object.keys(pockets)
          .filter(currency => currency !== ignoredValue)
          .map(currency => (
            <option key={currency}>{currency}</option>
          ))}
    </Select>
    <Balance
      warning={warning}>
      Balance: {pockets[value].amount.toFixed(2)} {value}
    </Balance>
  </Wrapper>
);

const mapStateToProps = ({ ui: { currencyPair, sourceAmount, targetAmount }, pockets }, { side }) => ({
  pockets,
  warning: side === 'source' && sourceAmount > pockets[currencyPair.source].amount,
  value: currencyPair[side],
  ignoredValue: currencyPair[side === 'source' ? 'target' : 'source'],
});

export default connect(mapStateToProps)(PocketSelector);