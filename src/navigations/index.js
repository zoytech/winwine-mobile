import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  BasicDialog,
  BlankScreen,
  CardDialog,
  GamePlayScreen,
  GameWaitScreen,
  HomeScreen,
} from 'src/screens';
import {ScreenKeys} from './ScreenKeys';
import {CenterAlignedTopBar, SmallTopBar} from 'src/components';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const headerShadowVisible = {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  };

  const headerProps = {
    headerBackTitleVisible: false,
  };
  const modalScreenProps = {
    presentation: 'transparentModal',
    cardOverlayEnable: false,
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenKeys.HOME}>
        <Stack.Group>
          <Stack.Screen
            name={ScreenKeys.HOME}
            component={HomeScreen}
            options={{
              ...headerProps,
              ...headerShadowVisible,
              header: () => <CenterAlignedTopBar />,
            }}
          />
          <Stack.Screen
            name={ScreenKeys.WAIT_GAME}
            component={GameWaitScreen}
            options={{
              ...headerProps,
              ...headerShadowVisible,
              header: () => <SmallTopBar />,
            }}
          />
          <Stack.Screen
            name={ScreenKeys.PLAY_GAME}
            component={GamePlayScreen}
            options={{
              ...headerProps,
              ...headerShadowVisible,
              header: () => <SmallTopBar />,
            }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{...modalScreenProps}}>
          <Stack.Screen
            name={ScreenKeys.BASIC_DIALOG}
            component={BasicDialog}
          />
          <Stack.Screen name={ScreenKeys.CARD_DIALOG} component={CardDialog} />
        </Stack.Group>
        <Stack.Screen name={ScreenKeys.BLANK} component={BlankScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
