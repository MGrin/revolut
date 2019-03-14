export const TYPES = {
  UPDATE_CURRENCY_PAIR: 'exchange/ui/update_currency_pair',
  SET_CURRENCY_PAIR: 'exchange/ui/set_currency_pair',
  SWIPE_CURRENCIES: 'exchange/ui/swipe_currencies',
  UPDATE_AMOUNT: 'exchange/ui/update_amount',
};

const updateCurrencyPair = (side, currency) => ({
  type: TYPES.UPDATE_CURRENCY_PAIR,
  side,
  currency,
});

const setCurrencyPair = (source, target) => ({
  type: TYPES.SET_CURRENCY_PAIR,
  source,
  target,
});

const swipeCurrencies = () => ({
  type: TYPES.SWIPE_CURRENCIES,
});

const updateAmount = (side, price, amount) => ({
  type: TYPES.UPDATE_AMOUNT,
  side,
  price: price ? parseFloat(price) : 0,
  amount: amount ? parseFloat(amount) : '',
});

export default {
  updateCurrencyPair,
  setCurrencyPair,
  swipeCurrencies,
  updateAmount,
};
