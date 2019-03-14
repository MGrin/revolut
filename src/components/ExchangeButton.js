import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../actions';

const Button = styled.button`
  width: calc(100% - 48px);
  height: 60px;
  border-radius: 30px;
  margin: 24px;
  background-color: rgb(235, 0, 141);
  color: white;
  font-size: 24px;
  cursor: pointer;

  &:focus {
    outline-color: rgb(235, 0, 181);
  }
  &:disabled {
    background-color: rgba(235, 0, 141, 0.5);
    cursor: inherit;
  }
`;

const ExchangeButton = ({
  source,
  target,
  amount,
  price,
  disabled,
  onClick,
}) => (
  <Button
    disabled={disabled}
    onClick={disabled ? null : () => onClick(source, target, amount, price)}>
    Exchange
  </Button>
);

const mapStateToProps = ({ ui, prices, pockets }) => ({
  source: ui.currencyPair.source,
  target: ui.currencyPair.target,
  amount: ui.sourceAmount,
  price: prices[`${ui.currencyPair.source}/${ui.currencyPair.target}`],
  disabled: !ui.sourceAmount || ui.sourceAmount > pockets[ui.currencyPair.source].amount,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (source, target, amount, price) => {
    dispatch(actions.pockets.exchange(source, target, amount, price));
    dispatch(actions.ui.updateAmount('source'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeButton);
