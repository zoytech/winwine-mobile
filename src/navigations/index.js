import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenKeys} from './ScreenKeys';

import APP_NAME from 'src/constants';
import {Color, ColorVariant} from 'src/themes';
import {
  GameEndScreen,
  GamePlayScreen,
  GameWaitScreen,
  HomeScreen,
} from '../screens';

const Stack = createNativeStackNavigator();
export default function RootNavigator(props) {
  const {colorVariant = ColorVariant.surface} = props;
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
  const modalScreenProps = {
    presentation: 'transparentModal',
    cardOverlayEnable: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenKeys.HOME}>
        <Stack.Group>
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
            name={ScreenKeys.GAME_WAIT}
            component={GameWaitScreen}
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
        </Stack.Group>
        <Stack.Group screenOptions={{...modalScreenProps}}>
          <Stack.Screen
            name={ScreenKeys.GAME_END}
            component={GameEndScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cardOverlay: {
    opacity: 0.5,
    backgroundColor: 'black',
    height: '100%',
  },
});

// <Stack.Screen
//     name={ScreenKeys.GAME_END}
//     component={GameEndScreen}
//     mode={'modal'}
//     options={{
//         presentation: 'transparentModal',
//         headerShown: false,
//         cardOverlayEnabled: true,
//         cardStyle: {backgroundColor: 'transparent'},
//     }}
// />
