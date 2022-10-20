import React from 'react';
import RootNavigator from './navigations';
import {Provider} from 'react-redux';
import configureStore from 'src/redux/store/configureStore';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
