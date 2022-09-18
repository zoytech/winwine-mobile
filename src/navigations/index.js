import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from './NavigationContainer';
import {HomeScreen} from '../screens';
import GameNavigator from './GameNavigator';
import {ScreenKeys} from './ScreenKeys';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenKeys.HOME} component={HomeScreen} />
        <Stack.Navigator name={ScreenKeys.GAME} component={GameNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
