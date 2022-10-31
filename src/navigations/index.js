import React from 'react';
import {StyleSheet, Text} from 'react-native';
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
import {
  CenterAlignedTopBar,
  SmallTopBar,
  StandardIconButton,
} from '../components';
import {Typography} from '../themes';

const Stack = createNativeStackNavigator();

function HeaderTitleRender(props) {
  const {route, title: fixedTitle, contentStyle} = props;
  const dynamicTitle = route.params?.title;
  const headerContentStyle = [Typography.title.large, contentStyle];

  return dynamicTitle ? (
    <Text style={headerContentStyle}>{dynamicTitle}</Text>
  ) : (
    <Text style={headerContentStyle}>{fixedTitle}</Text>
  );
}

function HeaderRightRender(props) {
  const {name} = props;
  return <StandardIconButton name={name} onPress={() => alert('alolaloa')} />;
}

export default function RootNavigator() {
  const {base, onBase} = Color.light[ColorVariant.surface];

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
            options={({navigation, route}) => ({
              headerRight: () => <HeaderRightRender name={'setting'} />,
              headerTitle: () => (
                <HeaderTitleRender
                  title={'Good morning'}
                  route={route}
                  contentStyle={{color: onBase}}
                />
              ),
              ...headerProps,
            })}
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
