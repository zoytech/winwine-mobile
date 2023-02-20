import {ScreenKeys} from './ScreenKeys';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ActionLibraryScreen,
  BasicDialog,
  CardDialog,
  CreateCardScreen,
  CreateDeckScreen,
  GamePlayScreen,
  GameWaitScreen,
  LibraryScreen,
  SearchLibraryScreen,
  SignInScreen,
} from 'src/screens';
import {useLayoutEffect} from 'react';
import {hideBottomTabBarMethod} from './utils';
import {
  CreateCardTopAppBar,
  GamePlayTopAppBar,
  GameWaitTopAppBar,
  LibraryTopAppBar,
} from 'src/screens/screenTopAppBars';

const LibraryStack = createNativeStackNavigator();
export default function LibraryStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [
      ScreenKeys.PLAY_GAME,
      ScreenKeys.WAIT_GAME,
      ScreenKeys.SIGNUP_AU,
      ScreenKeys.NAME_AU,
      ScreenKeys.CARD_DIALOG,
      ScreenKeys.BASIC_DIALOG,
      ScreenKeys.CREATE_DECK,
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
        <LibraryStack.Screen
          name={ScreenKeys.SIGNUP_AU}
          component={SignInScreen}
        />
        <LibraryStack.Screen
          name={ScreenKeys.SEARCH_LIB}
          component={SearchLibraryScreen}
          options={{headerShown: false}}
        />
        <LibraryStack.Screen
          name={ScreenKeys.CREATE_CARD}
          component={CreateCardScreen}
          options={{
            header: () => <CreateCardTopAppBar />,
          }}
        />
        <LibraryStack.Screen
          name={ScreenKeys.CREATE_DECK}
          component={CreateDeckScreen}
        />
      </LibraryStack.Group>
      <LibraryStack.Group screenOptions={modalScreenProps}>
        <LibraryStack.Screen
          name={ScreenKeys.ACTION_LIB}
          component={ActionLibraryScreen}
        />
        <LibraryStack.Screen
          name={ScreenKeys.BASIC_DIALOG}
          component={BasicDialog}
        />
        <LibraryStack.Screen
          name={ScreenKeys.CARD_DIALOG}
          component={CardDialog}
        />
      </LibraryStack.Group>
    </LibraryStack.Navigator>
  );
}
