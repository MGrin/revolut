import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import PocketSelector from './PocketSelector';

import {
  PocketWrapper,
  Input,
} from './styled';

const SourcePocket = ({
  side,
  value,
  price,
  maxValue,
  onAmountChange,
  onCurrencyChange,
}) => (
  <PocketWrapper bg={side === 'source' ? 'white' : 'transparent'}>
    <PocketSelector
      side={side}
      onChange={onCurrencyChange} />
    <Input
      autoFocus={side === 'source'}
      type="number"
      placeholder="0"
      min="0"
      max={`${maxValue}`}
      value={`${value}`}
      onChange={({ target }) => onAmountChange(price, target.value)} />
  </PocketWrapper>
);

const mapStateToProps = ({
  ui: {
    sourceAmount,
    targetAmount,
    currencyPair,
  },
  prices,
  pockets,
}, { side }) => {
  const value = side === 'source' ? sourceAmount : targetAmount;
  const pair = side === 'source' ? `${currencyPair.source}/${currencyPair.target}` : `${currencyPair.source}/${currencyPair.target}`;
  const price = prices[pair];
  const maxValue = pockets[currencyPair.source].amount * (side === 'source' ? 1 : price);

  return {
    value,
    price,
    maxValue,
  };
};

const mapDispatchToProps = (dispatch, { side }) => ({
  onAmountChange: (price, value) => dispatch(actions.ui.updateAmount(side, price, value)),
  onCurrencyChange: (currency) => dispatch(actions.ui.updateCurrencyPair(side, currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SourcePocket);