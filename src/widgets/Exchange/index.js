import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import {
  prices,
} from '../../lib';

import {
  WidgetWrapper,
  Header,
  PocketLine,
  Toolbox,
  ExchangeButton,
} from '../../components';

const PRICES_UPDATE_INTERVAL = 10 * 1000;

class ExchangeWidget extends React.Component {
  componentWillMount() {
    const {
      currencyPair,
    } = this.props;

    if (!currencyPair) return;

    this.updatePrices(currencyPair);
    this.priceFetchInterval = setInterval(() => this.updatePrices(currencyPair), PRICES_UPDATE_INTERVAL);
  }

  componentWillReceiveProps({ currencyPair }) {
    const shouldRescheduleFetching = this.props.currencyPair
      && (currencyPair.source !== this.props.currencyPair.source || currencyPair.target !== this.props.currencyPair.target);

    if (!shouldRescheduleFetching) return;

    clearInterval(this.priceFetchInterval);

    this.updatePrices(currencyPair);
    this.priceFetchInterval = setInterval(() => this.updatePrices(currencyPair), PRICES_UPDATE_INTERVAL);
  }

  updatePrices = async (currencyPair) => {
    const {
      updatePrice
    } = this.props;

    const updates = await prices.fetchPricesForPair(currencyPair);
    Object.keys(updates)
      .map(pair => updatePrice(pair, updates[pair]));
  }

  render() {
    const {
      onClose,
    } = this.props;

    return (
      <WidgetWrapper>
        <Header onClose={onClose} />
        <PocketLine side="source" />
        <Toolbox />
        <PocketLine side="target" />
        <ExchangeButton />
      </WidgetWrapper>
    );
  }
};

const mapStateToProps = ({ ui: { currencyPair } }) => ({
  currencyPair,
});
const mapDispatchToProps = (dispatch) => ({
  updatePrice: (pair, price) => dispatch(actions.prices.updateCurrencyPrice(pair, price)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeWidget);
