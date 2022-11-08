import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  BlankScreen,
  GamePlayScreen,
  GameWaitScreen,
  HomeScreen,
} from 'src/screens';
import {ScreenKeys} from './ScreenKeys';
import {BasicDialog, CenterAlignedTopBar, SmallTopBar} from 'src/components';
import BasicDialogM from '../screens/modalScreens/BasicDialog';

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
            name={ScreenKeys.GAME_WAIT}
            component={GameWaitScreen}
            options={{
              ...headerProps,
              ...headerShadowVisible,
              header: () => <SmallTopBar />,
            }}
          />
          <Stack.Screen
            name={ScreenKeys.GAME_PLAY}
            component={GamePlayScreen}
            options={{
              ...headerProps,
              ...headerShadowVisible,
              header: () => <SmallTopBar />,
            }}
          />
        </Stack.Group>
        <Stack.Screen
          name={ScreenKeys.BASIC_DIALOG}
          component={BasicDialogM}
          options={{...modalScreenProps}}
        />
        <Stack.Screen name={ScreenKeys.BLANK} component={BlankScreen} />
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
