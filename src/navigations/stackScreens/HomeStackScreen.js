import {ScreenKeys} from '../ScreenKeys';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BasicDialog,
  BlankScreen,
  CardDialog,
  GamePlayScreen,
  GameWaitScreen,
  HomeScreen,
} from 'src/screens';
import {CenterTopBar, MediumTopBar, SmallTopBar} from 'src/components';
import {useLayoutEffect} from 'react';
import hideBottomTabBarMethod from '../hideBottomTabBarMethod';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [
      ScreenKeys.PLAY_GAME,
      ScreenKeys.WAIT_GAME,
      ScreenKeys.CARD_DIALOG,
      ScreenKeys.BASIC_DIALOG,
    ];
    hideBottomTabBarMethod({navigation, route, tabHiddenRoutes});
  }, [navigation, route]);

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
            header: () => <CenterTopBar />,
          }}
        />
        <HomeStack.Screen
          name={ScreenKeys.WAIT_GAME}
          component={GameWaitScreen}
          options={{
            header: () => <MediumTopBar />,
          }}
        />
        <HomeStack.Screen
          name={ScreenKeys.PLAY_GAME}
          component={GamePlayScreen}
          options={{
            header: () => <SmallTopBar />,
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
