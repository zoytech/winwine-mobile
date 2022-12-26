import React from 'react';
import RootNavigator from './navigations';
import {Provider} from 'react-redux';
import configureStore from 'src/redux/store/configureStore';
import {ErrorBoundary} from 'src/screens';

const store = configureStore();

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </ErrorBoundary>
  );
}
/*

 */
