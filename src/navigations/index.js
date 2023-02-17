import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackScreen from './HomeStackScreen';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
}
