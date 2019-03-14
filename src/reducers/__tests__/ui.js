import ui from '../ui';
import actions from '../../actions';

let state = undefined;
it('Should return valid init state', () => {
  const validState = {
    currencyPair: null,
    sourceAmount: null,
    targetAmount: null,
  };

  state = ui(state, { type: 'initial' });
  expect(state).toEqual(validState);
});

it('should set a currency pair', () => {
  const validState = {
    ...state,
    currencyPair: {
      source: 'GBP',
      target: 'USD',
    },
    sourceAmount: '',
    targetAmount: '',
  };

  state = ui(state, actions.ui.setCurrencyPair('GBP', 'USD'));
  expect(state).toEqual(validState);
});

it('should not update amount for unknown side', () => {
  const validState = state;

  state = ui(state, actions.ui.updateAmount('bla', 1, 10));
  expect(state).toEqual(validState);
});

it('should not update amount for negative number', () => {
  const validState = state;

  state = ui(state, actions.ui.updateAmount('source', 1, -10));
  expect(state).toEqual(validState);

  state = ui(state, actions.ui.updateAmount('target', 1, -10));
  expect(state).toEqual(validState);
});

it('should update amount', () => {
  const amount = 10;
  const price = 1.2;
  const side = 'source';

  const validState = {
    ...state,
    sourceAmount: amount,
    targetAmount: amount * price,
  };

  state = ui(state, actions.ui.updateAmount(side, price, amount));
  expect(state).toEqual(validState);
});

it('should swipe a currency pair', () => {
  const validState = {
    ...state,
    currencyPair: {
      source: 'USD',
      target: 'GBP',
    },
    sourceAmount: state.targetAmount,
    targetAmount: state.sourceAmount,
  };

  state = ui(state, actions.ui.swipeCurrencies());
  expect(state).toEqual(validState);
});

it('should not update currency pair for an invalid side', () => {
  const validState = state;

  state = ui(state, actions.ui.updateCurrencyPair('bla', 'EUR'));
  expect(state).toEqual(validState);
});

it('should update currency pair', () => {
  const validState = {
    ...state,
    currencyPair: {
      source: 'EUR',
      target: 'GBP',
    },
    sourceAmount: '',
    targetAmount: '',
  };

  state = ui(state, actions.ui.updateCurrencyPair('source', 'EUR'));
  expect(state).toEqual(validState);

  validState.currencyPair.target='CHF';
  state = ui(state, actions.ui.updateCurrencyPair('target', 'CHF'));
  expect(state).toEqual(validState);
});