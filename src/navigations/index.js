import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabStackScreen2 from './TabStackScreen2';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <TabStackScreen2 />
    </NavigationContainer>
  );
}
