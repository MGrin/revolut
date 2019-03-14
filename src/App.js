import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import actions from './actions';
import reducers from './reducers';

import { Exchange } from './widgets';
import { ExampleAppWrapper } from './components';

const store = createStore(reducers);

const GlobalStyles = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

class App extends Component {
  componentWillMount() {
    // Add mock pockets
    store.dispatch(actions.pockets.addPocket('GBP'));
    store.dispatch(actions.pockets.topup('GBP', 500));

    store.dispatch(actions.pockets.addPocket('USD'));
    store.dispatch(actions.pockets.topup('USD', 400));

    store.dispatch(actions.pockets.addPocket('EUR'));
    store.dispatch(actions.pockets.topup('EUR', 300));

    store.dispatch(actions.pockets.addPocket('CHF'));
    store.dispatch(actions.pockets.topup('CHF', 200));

    store.dispatch(actions.ui.setCurrencyPair('GBP', 'USD'));
  }

  handleCloseExchange = () => {
    // setTimeout here to continue rendering even with alert;
    setTimeout(() => alert('Exchange widget is closed'), 1);
  }

  render() {
    return (
      <Provider store={store}>
        <GlobalStyles />
        <ExampleAppWrapper>
          <Exchange onClose={this.handleCloseExchange} />
        </ExampleAppWrapper>
      </Provider>
    );
  }
}

export default App;
