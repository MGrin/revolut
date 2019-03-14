import { types } from '../actions';

export default (state = {}, action) => {
  switch(action.type) {
    case types.prices.UPDATE_CURRENCY: {
      const { pair, price } = action;
      return {
        ...state,
        [pair]: price,
      };
    }

    default: return state;
  }
};
