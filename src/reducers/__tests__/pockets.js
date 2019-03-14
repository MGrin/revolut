import pockets from '../pockets';
import actions from '../../actions';

let state = undefined;

it('should return an empty initial state', () => {
  const validState = {};

  state = pockets(state, { type: 'initial' });
  expect(state).toEqual(validState);
});

it('should add pocket', () => {
  const validState = {
    GBP: {
      amount: 0,
    },
  };

  state = pockets({}, actions.pockets.addPocket('GBP'));
  expect(state).toEqual(validState);
});

it('should not add existing pocket', () => {
  const validState = state;

  state = pockets(state, actions.pockets.addPocket('GBP'));
  expect(state).toEqual(validState);
});

it('should add second pocket', () => {
  const validState = {
    ...state,
    USD: {
      amount: 0,
    },
  };

  state = pockets(state, actions.pockets.addPocket('USD'));
  expect(state).toEqual(validState);
});

it('should topup existing pocket', () => {
  const validState = {
    ...state,
    USD: {
      amount: 100,
    },
  };

  state = pockets(state, actions.pockets.topup('USD', 100));
  expect(state).toEqual(validState);
});

it('should not topup unexisting pocket', () => {
  const validState = state;

  state = pockets(state, actions.pockets.topup('BLABLA', 100));
  expect(state).toEqual(validState);
});

it('should not topup pocket with negative amount', () => {
  const validState = state;

  state = pockets(state, actions.pockets.topup('USD', -100));
  expect(state).toEqual(validState);
});

it('should withdraw from existing pocket with non-zero amount', () => {
  const validState = {
    ...state,
    USD: {
      amount: 50,
    },
  };

  state = pockets(state, actions.pockets.withdraw('USD', 50));
  expect(state).toEqual(validState);
});

it('should not withdraw from unexisting pocket', () => {
  const validState = state;

  state = pockets(state, actions.pockets.withdraw('BLABLA', 100));
  expect(state).toEqual(validState);
});

it('should not withdraw more than pocket amount', () => {
  const validState = state;

  state = pockets(state, actions.pockets.withdraw('USD', 100));
  expect(state).toEqual(validState);
});

it('should not withdraw negative amount', () => {
  const validState = state;

  state = pockets(state, actions.pockets.withdraw('20', -100));
  expect(state).toEqual(validState);
});

it('should not remove non-empty pocket', () => {
  const validState = state;

  state = pockets(state, actions.pockets.removePocket('USD'));
  expect(state).toEqual(validState);
});

it('should not remove unexisting pocket', () => {
  const validState = state;

  state = pockets(state, actions.pockets.removePocket('BLABLA'));
  expect(state).toEqual(validState);
});

it('should remove empty pocket', () => {
  const validState = state;
  delete validState.GBP;

  state = pockets(state, actions.pockets.removePocket('GBP'));
  expect(state).toEqual(validState);
});

it('should not exchange when no source pocket exists', () => {
  const validState = state;

  state = pockets(state, actions.pockets.exchange('GBP', 'USD', 10, 1));
  expect(state).toEqual(validState);
});

it('should not exchange when no target pocket exists', () => {
  const validState = state;

  state = pockets(state, actions.pockets.exchange('USD', 'GBP', 10, 1));
  expect(state).toEqual(validState);
});

it('should not exchange negative amount', () => {
  state = pockets(state, actions.pockets.addPocket('GBP'));
  state = pockets(state, actions.pockets.topup('GBP', 100));

  const validState = state;

  state = pockets(state, actions.pockets.exchange('GBP', 'USD', -10, 1));
  expect(state).toEqual(validState);
});

it('should not exchange with negative price', () => {
  const validState = state;

  state = pockets(state, actions.pockets.exchange('GBP', 'USD', 10, -1));
  expect(state).toEqual(validState);
});

it('should exchange', () => {
  const amount = 10;
  const price = 1.2;

  const validState = {
    ...state,
    USD: {
      amount: state.USD.amount + amount * price,
    },
    GBP: {
      amount: state.GBP.amount - amount,
    },
  };

  state = pockets(state, actions.pockets.exchange('GBP', 'USD', amount, price));
  expect(state).toEqual(validState);
});
