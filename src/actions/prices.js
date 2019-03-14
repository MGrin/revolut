export const TYPES = {
  UPDATE_CURRENCY: 'exchange/prices/update',
};

const updateCurrencyPrice = (pair, price) => ({
  type: TYPES.UPDATE_CURRENCY,
  pair,
  price: parseFloat(price),
});

export default {
  updateCurrencyPrice,
};
