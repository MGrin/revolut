const FX_EXCHANGE_URL = 'https://api.exchangeratesapi.io/latest?';

export const fetchPricesForPair= async ({ source, target }) => {
  try {
    const calls = [
      fetch(`${FX_EXCHANGE_URL}symbols=${target}&base=${source}`).then(res => res.json()),
      fetch(`${FX_EXCHANGE_URL}symbols=${source}&base=${target}`).then(res => res.json()),
    ];

    const [sourceTargetPrice, targetSourcePrice] = await Promise.all(calls);

    return {
      [`${source}/${target}`]: sourceTargetPrice.rates[target],
      [`${target}/${source}`]: targetSourcePrice.rates[source],
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};
