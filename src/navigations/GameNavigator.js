import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {GameScreen} from 'src/screens';
import {ScreenKeys} from './ScreenKeys';

const Stack = createStackNavigator();

export default function GameNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenKeys.GAME_PLAY} component={GameScreen} />
    </Stack.Navigator>
  );
}
