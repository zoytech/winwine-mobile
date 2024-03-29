import {ScreenKeys} from './ScreenKeys';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BasicDialog,
  CardDialog,
  GamePlayScreen,
  GameWaitScreen,
  HomeScreen,
} from 'src/screens';
import {useLayoutEffect} from 'react';
import {hideBottomTabBarMethod} from './utils';
import {
  GamePlayTopAppBar,
  GameWaitTopAppBar,
  HomeTopAppBar,
} from 'src/screens/screenTopAppBars';

const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen({navigation, route}) {
  const modalScreenProps = {
    presentation: 'transparentModal',
    cardOverlayEnable: false,
    headerShown: false,
  };
  return (
    <HomeStack.Navigator>
      <HomeStack.Group initialRouteName={ScreenKeys.HOME}>
        <HomeStack.Screen
          name={ScreenKeys.HOME}
          component={HomeScreen}
          options={{
            header: () => <HomeTopAppBar />,
          }}
        />
        <HomeStack.Screen
          name={ScreenKeys.WAIT_GAME}
          component={GameWaitScreen}
          options={{
            header: () => <GameWaitTopAppBar />,
          }}
        />
        <HomeStack.Screen
          name={ScreenKeys.PLAY_GAME}
          component={GamePlayScreen}
          options={{
            header: () => <GamePlayTopAppBar />,
          }}
        />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={modalScreenProps}>
        <HomeStack.Screen
          name={ScreenKeys.BASIC_DIALOG}
          component={BasicDialog}
        />
        <HomeStack.Screen
          name={ScreenKeys.CARD_DIALOG}
          component={CardDialog}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}
