import React from 'react';
import RootNavigator from './navigations';
import {Provider} from 'react-redux';
import configureStore from 'src/redux/store';
import {ErrorBoundary} from 'src/screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const store = configureStore();

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <RootNavigator />
        </GestureHandlerRootView>
      </Provider>
    </ErrorBoundary>
  );
}

/*

 */
