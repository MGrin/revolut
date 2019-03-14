export const TYPES = {
  ADD_POCKET: 'pockets/add',
  REMOVE_POCKET: 'pockets/remove',
  TOPUP_POCKET: 'pockets/topup',
  WITHDRAW_POCKET: 'pockets/withdraw',
  EXCHANGE: 'pockets/exchange',
};

const addPocket = (currency) => ({
  type: TYPES.ADD_POCKET,
  currency,
});

const removePocket = (currency) => ({
  type: TYPES.REMOVE_POCKET,
  currency,
});

const topup = (currency, amount) => ({
  type: TYPES.TOPUP_POCKET,
  currency,
  amount: parseFloat(amount),
});

const withdraw = (currency, amount) => ({
  type: TYPES.WITHDRAW_POCKET,
  currency,
  amount: parseFloat(amount),
});

const exchange = (source, target, amount, price) => ({
  type: TYPES.EXCHANGE,
  source,
  target,
  amount: parseFloat(amount),
  price: parseFloat(price),
});

export default {
  addPocket,
  removePocket,
  topup,
  withdraw,
  exchange,
};
