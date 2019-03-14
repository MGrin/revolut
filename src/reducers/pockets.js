import { types } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.pockets.ADD_POCKET: {
      const { currency } = action;
      if (state[currency]) {
        console.warn(`Pocket ${currency} already exists`);
        return state;
      }

      return {
        ...state,
        [currency]: {
          amount: 0,
        },
      };
    }

    case types.pockets.REMOVE_POCKET: {
      const { currency } = action;
      if (!state[currency]) {
        console.warn(`Pocket ${currency} does not exist`);
        return state;
      }

      if (state[currency].amount > 0) {
        console.warn(`Pocket ${currency} is not empty`);
        return state;
      }

      const newState = {
        ...state,
      };
      delete newState[currency];

      return newState;
    }

    case types.pockets.TOPUP_POCKET: {
      const { currency, amount } = action;
      if (!state[currency]) {
        console.warn(`Pocket ${currency} does not exist`);
        return state;
      }

      if (amount < 0) {
        console.warn(`Can not topup negative amount for the pocket ${currency}`);
        return state;
      }

      const newAmount = state[currency].amount + amount;

      return {
        ...state,
        [currency]: {
          amount: newAmount,
        },
      };
    }

    case types.pockets.WITHDRAW_POCKET: {
      const { currency, amount } = action;
      if (!state[currency]) {
        console.warn(`Pocket ${currency} does not exist`);
        return state;
      }

      if (amount < 0) {
        console.warn(`Can not withdraw negative amount from the pocket ${currency}`);
        return state;
      }

      if (amount > state[currency].amount) {
        console.warn(`Not enought money in ${currency} pocket`);
        return state;
      }

      const newAmount = state[currency].amount - amount;

      return {
        ...state,
        [currency]: {
          amount: newAmount,
        },
      };
    }

    case types.pockets.EXCHANGE: {
      const { source, target, amount, price } = action;
      if (!state[source]) {
        console.warn(`Pocket ${source} does not exist`);
        return state;
      }

      if (!state[target]) {
        console.warn(`Pocket ${target} does not exist`);
        return state;
      }

      if (amount < 0) {
        console.warn(`Can not exchange negative amount from the pocket ${source}`);
        return state;
      }

      if (price < 0) {
        console.warn(`Can not exchange with negative price`);
        return state;
      }

      if (amount > state[source]) {
        console.warn(`Not enought money in ${source} pocket`);
        return state;
      }

      return {
        ...state,
        [source]: {
          ...state[source],
          amount: state[source].amount - amount,
        },
        [target]: {
          ...state[target],
          amount: state[target].amount + amount * price,
        },
      };
    }

    default: return state;
  }
};
