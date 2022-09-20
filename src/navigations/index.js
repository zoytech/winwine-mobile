import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {GameScreen, HomeScreen} from '../screens';
import {ScreenKeys} from './ScreenKeys';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenKeys.HOME} component={HomeScreen} />
        <Stack.Screen name={ScreenKeys.GAME_PLAY} component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
