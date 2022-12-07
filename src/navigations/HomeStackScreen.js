import {ScreenKeys} from './ScreenKeys';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  BasicDialog,
  BlankScreen,
  CardDialog,
  GamePlayScreen,
  GameWaitScreen,
  HomeScreen,
} from '../screens';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
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
    <HomeStack.Navigator initialRouteName={ScreenKeys.HOME}>
      <HomeStack.Group>
        <HomeStack.Screen
          name={ScreenKeys.HOME}
          component={HomeScreen}
          options={{
            ...headerProps,
            ...headerShadowVisible,
          }}
        />
        <HomeStack.Screen
          name={ScreenKeys.WAIT_GAME}
          component={GameWaitScreen}
          options={{
            ...headerProps,
            ...headerShadowVisible,
          }}
        />
        <HomeStack.Screen
          name={ScreenKeys.PLAY_GAME}
          component={GamePlayScreen}
          options={{
            ...headerProps,
            ...headerShadowVisible,
          }}
        />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{...modalScreenProps}}>
        <HomeStack.Screen
          name={ScreenKeys.BASIC_DIALOG}
          component={BasicDialog}
        />
        <HomeStack.Screen
          name={ScreenKeys.CARD_DIALOG}
          component={CardDialog}
        />
      </HomeStack.Group>
      <HomeStack.Screen name={ScreenKeys.BLANK} component={BlankScreen} />
    </HomeStack.Navigator>
  );
}
