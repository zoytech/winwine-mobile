import {ScreenKeys} from './ScreenKeys';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GamePlayScreen, GameWaitScreen, LibraryScreen} from 'src/screens';
import {useLayoutEffect} from 'react';
import hideBottomTabBarMethod from './hideBottomTabBarMethod';
import {
  GamePlayTopAppBar,
  GameWaitTopAppBar,
  LibraryTopAppBar,
} from 'src/screens/headerComponents';
import {CreateActionScreen, DeckActionScreen} from '../screens/actionScreens';

const LibraryStack = createNativeStackNavigator();
export default function LibraryStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [
      ScreenKeys.PLAY_GAME,
      ScreenKeys.WAIT_GAME,
      ScreenKeys.CREATE_ACTION,
      ScreenKeys.DECK_ACTION,
    ];
    hideBottomTabBarMethod({navigation, route, tabHiddenRoutes});
  }, [navigation, route]);

  const modalScreenProps = {
    presentation: 'transparentModal',
    cardOverlayEnable: false,
    headerShown: false,
  };
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Group initialRouteName={ScreenKeys.LIBRARY}>
        <LibraryStack.Screen
          name={ScreenKeys.LIBRARY}
          component={LibraryScreen}
          options={{
            header: () => <LibraryTopAppBar />,
          }}
        />
        <LibraryStack.Screen
          name={ScreenKeys.WAIT_GAME}
          component={GameWaitScreen}
          options={{
            header: () => <GameWaitTopAppBar />,
          }}
        />
        <LibraryStack.Screen
          name={ScreenKeys.PLAY_GAME}
          component={GamePlayScreen}
          options={{
            header: () => <GamePlayTopAppBar />,
          }}
        />
      </LibraryStack.Group>
      <LibraryStack.Group screenOptions={modalScreenProps}>
        <LibraryStack.Screen
          name={ScreenKeys.DECK_ACTION}
          component={DeckActionScreen}
        />
        <LibraryStack.Screen
          name={ScreenKeys.CREATE_ACTION}
          component={CreateActionScreen}
        />
      </LibraryStack.Group>
    </LibraryStack.Navigator>
  );
}
