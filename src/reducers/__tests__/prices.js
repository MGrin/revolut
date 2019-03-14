import prices from '../prices';
import actions from '../../actions';

let state = undefined;

it('should return valid init state', () => {
  const validState = {};

  state = prices(state, { type: 'initial' });
  expect(state).toEqual(validState);
});

it('should set price for pair', () => {
  const validState = {
    'GBP/USD': 1.1,
  };

  state = prices(state, actions.prices.updateCurrencyPrice('GBP/USD', 1.1));
  expect(state).toEqual(validState);
});

it('should update price for pair', () => {
  const validState = {
    'GBP/USD': 1.2,
  };

  state = prices(state, actions.prices.updateCurrencyPrice('GBP/USD', 1.2));
  expect(state).toEqual(validState);
});