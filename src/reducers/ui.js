import { types } from '../actions';

const initialState = {
  currencyPair: null,
  sourceAmount: null,
  targetAmount: null,
};

const round = amount => Math.floor(amount * 100) / 100;

export default (state = initialState, action) => {
  switch(action.type) {
    case types.ui.SET_CURRENCY_PAIR: {
      const { source, target } = action;
      const currencyPair = {
        source,
        target,
      };

      return {
        ...state,
        currencyPair,
        sourceAmount: '',
        targetAmount: '',
      };
    }
    case types.ui.UPDATE_CURRENCY_PAIR: {
      const { side, currency } = action;
      if (side !== 'source' && side !== 'target') {
        console.warn(`Unknown side ${side}, should be one of: source, target`);
        return state;
      }

      const unchangedSide = side === 'source' ? 'target' : 'source';

      const currencyPair = {
        [side]: currency,
        [unchangedSide]: state.currencyPair[unchangedSide],
      };

      const shouldResetState = state.currencyPair
        && state.currencyPair.source === currencyPair.source
        && state.currencyPair.target === currencyPair.target;

      if (shouldResetState) {
        return state;
      }

      return {
        ...state,
        currencyPair,
        sourceAmount: '',
        targetAmount: '',
      };
    }

    case types.ui.SWIPE_CURRENCIES: {
      const currencyPair = {
        source: state.currencyPair.target,
        target: state.currencyPair.source,
      };

      return {
        ...state,
        currencyPair,
        sourceAmount: state.targetAmount,
        targetAmount: state.sourceAmount,
      };
    }

    case types.ui.UPDATE_AMOUNT: {
      const { side, price, amount } = action;
      if (side !== 'source' && side !== 'target') {
        console.warn(`Unknown side ${side}, should be one of: source, target`);
        return state;
      }

      if (amount < 0) {
        console.warn(`Can not set negative amount`);
        return state;
      }

      const oppositeSide = side === 'source' ? 'target' : 'source';

      return {
        ...state,
        [`${side}Amount`]: amount ? round(amount) : amount,
        [`${oppositeSide}Amount`]: amount ? round(amount * price) : amount,
      }
    }

    default: {
      return state;
    }
  }
};
