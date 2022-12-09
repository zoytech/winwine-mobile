import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabStackScreen} from './tabStackScreen';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <TabStackScreen />
    </NavigationContainer>
  );
}
