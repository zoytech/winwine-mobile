import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenKeys} from './ScreenKeys';

import {
  GameEndScreen,
  GamePlayScreen,
  GameWaitScreen,
  HomeScreen,
} from '../screens';
import APP_NAME from 'src/constants';
import {Color, ColorVariant, Typography} from 'src/themes';

const Stack = createNativeStackNavigator();

export default function RootNavigator(props) {
  const {
    colorVariant = ColorVariant.surface,
    typography = Typography.headline.large,
  } = props;
  const {base, onBase} = Color.light[colorVariant];
  const headerShadowVisible = {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  };
  const headerStyle = {
    headerTintColor: onBase,
    headerTitleAlign: 'center',
    headerBackGround: base,
  };

  return (
    <NavigationContainer initialRouteName={ScreenKeys.HOME}>
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenKeys.GAME_WAIT}
          component={GameWaitScreen}
          options={{
            title: 'Bai cua Nam',
            ...headerStyle,
            ...headerShadowVisible,
          }}
        />
        <Stack.Screen
          name={ScreenKeys.HOME}
          component={HomeScreen}
          options={{
            title: APP_NAME,
            ...headerStyle,
            ...headerShadowVisible,
          }}
        />
        <Stack.Screen
          name={ScreenKeys.GAME_END}
          component={GameEndScreen}
          options={{
            title: 'Bai cua Nam',
            ...headerStyle,
            ...headerShadowVisible,
          }}
        />
        <Stack.Screen
          name={ScreenKeys.GAME_PLAY}
          component={GamePlayScreen}
          options={{
            title: 'Bai cua Nam',
            ...headerStyle,
            ...headerShadowVisible,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
