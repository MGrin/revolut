import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import actions from '../actions';

const Wrapper = styled.div`
  height: 50px;
  background-image: linear-gradient(to bottom, white, white 50%, transparent 50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
`;

const SwipeButton = styled.button`
  height: 50px;
  width: 50px;
  background-color: rgb(0, 117, 235);
  border: 2px solid rgb(0, 117, 235);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;

  &:focus {
    outline: 0;
  }
`;

const Price = styled.span`
  background-color: white;
  color: rgb(0, 117, 235);
  border: 2px solid rgb(0, 117, 235);
  font-size: 24px;
  height: 40px;
  line-height: 40px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 20px;
  min-width: 60px;
`;

const Toolbox = ({ price = 0, swipeCurrencies }) => (
  <Wrapper>
    <SwipeButton onClick={swipeCurrencies}>&#8645;</SwipeButton>
    <Price>{price.toFixed(6)}</Price>
  </Wrapper>
);

const mapStateToProps = ({ ui: { currencyPair }, prices }) => ({
  price: prices[`${currencyPair.source}/${currencyPair.target}`],
});

const mapDispatchToProps = (dispatch) => ({
  swipeCurrencies: () => dispatch(actions.ui.swipeCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox);
