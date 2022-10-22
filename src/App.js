import React from 'react';
import RootNavigator from './navigations';
import {Provider} from 'react-redux';
import {store} from './store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
