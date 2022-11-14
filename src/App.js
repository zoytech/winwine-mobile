import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './navigations';
import {Provider} from 'react-redux';
import configureStore from 'src/redux/store/configureStore';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <RootNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}
