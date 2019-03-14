import prices, { TYPES } from '../prices';

const TESTED_TYPES = [
  'UPDATE_CURRENCY',
];

const TESTED_ACTIONS = [
  'updateCurrencyPrice',
];

it('should export all tested types', () => {
  expect(Object.keys(TYPES).sort()).toEqual(TESTED_TYPES.sort());
});

it('should export all tested actions', () => {
  expect(Object.keys(prices).sort()).toEqual(TESTED_ACTIONS.sort());
});

it('should parseFloat for updatePRice action', () => {
  const validAction = {
    type: TYPES.UPDATE_CURRENCY,
    pair: 'GBP/USD',
    price: 1.2,
  };

  const action = prices.updateCurrencyPrice('GBP/USD', '1.2');
  expect(action).toEqual(validAction);
});
