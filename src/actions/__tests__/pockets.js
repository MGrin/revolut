import pockets, { TYPES } from '../pockets';

const TESTED_TYPES = [
  'ADD_POCKET',
  'REMOVE_POCKET',
  'TOPUP_POCKET',
  'WITHDRAW_POCKET',
  'EXCHANGE',
];

const TESTED_ACTIONS = [
  'addPocket',
  'removePocket',
  'topup',
  'withdraw',
  'exchange',
];

it('should export all tested types', () => {
  expect(Object.keys(TYPES).sort()).toEqual(TESTED_TYPES.sort());
});

it('should export all tested actions', () => {
  expect(Object.keys(pockets).sort()).toEqual(TESTED_ACTIONS.sort());
});

it('should parseFloat for topup action', () => {
  const validAction = {
    type: TYPES.TOPUP_POCKET,
    currency: 'CHF',
    amount: 10,
  };

  const action = pockets.topup('CHF', '10');
  expect(action).toEqual(validAction);
});

it('should parseFloat for withdraw action', () => {
  const validAction = {
    type: TYPES.WITHDRAW_POCKET,
    currency: 'CHF',
    amount: 10,
  };

  const action = pockets.withdraw('CHF', '10');
  expect(action).toEqual(validAction);
});

it('should parseFloat for exchange action', () => {
  const validAction = {
    type: TYPES.EXCHANGE,
    source: 'CHF',
    target: 'USD',
    amount: 10,
    price: 1.1,
  };

  const action = pockets.exchange('CHF', 'USD', '10', '1.1');
  expect(action).toEqual(validAction);
});
