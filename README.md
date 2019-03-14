# Revolut Frontend Test

This app is based on create-react-app:
* `npm start` to run it locally
* `npm test` to run all tests
* `npm build` to build for production

## Main libraries used:
* `React` - obvious
* `redux` - state  management
* `styled-components` - for styling

No redux Saga/Thunk is used.

## Structure:
Usual redux-like structure:
* `actions/` - contains all action creators and action types
* `components/` - all "reusable" components across the application. Not splitted into atoms, molecules etc. since this is an example app
* `components/styled` - all styled components
* `lib` - anything that is not directly related to React/Redux app. Now - only fetching function for prices
* `reducers` - reducers :)
* `widgets` - application screens. Currently only Exchange screen

## Improvements
* Price fetching interval is attached to the Exchange widget itself. For this small project it is ok, but for larger projects I'd think about exporting this kind of side effects somewhere outside of the application
* Convertion of the currency pair to a string (example: `{ source: 'GBP', target: 'USD' } -> 'GBP/USD'`) can be exported to the currency pair class, but would be overcomplication for this demo
* Add loaders and loading states. Currently, if there is no data, nothing is shown. More precisely, if no price for a pair is provided, the price is believed to be 0 until there is first price from FX echange
* `side` variable and prop name should be renamed to something more meaningfull. It refers to the side currency of the exchange process - source or target. Also, currently it is a string and is compared to 'source' and 'target' values pretty much anywhere.
* FX Exchange source is `https://api.exchangeratesapi.io` - a simple one that does not require any registration or key