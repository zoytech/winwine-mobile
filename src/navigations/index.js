import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Color, ColorVariant} from 'src/themes';
import {
  EndingGameDialog,
  ExitGameDialog,
  GamePlayScreen,
  GameWaitScreen,
  HomeScreen,
} from 'src/screens';
import {ScreenKeys} from './ScreenKeys';
import TestScreen from '../screens/TestScreen';

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  const {base, onBase} = Color.light[ColorVariant.surface];

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
    headerShown: false,
  };

  function headerNavBarProps({route}) {
    console.log('route', route);
    return {
      title: route.params.title,
      ...headerStyle,
      ...headerShadowVisible,
    };
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'TESTING'}>
        <Stack.Screen name={'TESTING'} component={TestScreen} />
        <Stack.Group
          screenOptions={{
            ...headerStyle,
            ...headerShadowVisible,
          }}>
          <Stack.Screen name={ScreenKeys.HOME} component={HomeScreen} />
          <Stack.Screen
            name={ScreenKeys.GAME_WAIT}
            component={GameWaitScreen}
          />
          <Stack.Screen
            name={ScreenKeys.GAME_PLAY}
            component={GamePlayScreen}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{...modalScreenProps}}>
          <Stack.Screen
            name={ScreenKeys.DIALOG_GAME_END}
            component={EndingGameDialog}
          />
          <Stack.Screen
            name={ScreenKeys.DIALOG_GAME_EXIT}
            component={ExitGameDialog}
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
//     component={EndingGameDialog}
//     mode={'modal'}
//     options={{
//         presentation: 'transparentModal',
//         headerShown: false,
//         cardOverlayEnabled: true,
//         cardStyle: {backgroundColor: 'transparent'},
//     }}
// />
