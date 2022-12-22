import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabStackScreen from './TabStackScreen';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <TabStackScreen />
    </NavigationContainer>
  );
}
