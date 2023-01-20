import {ScreenKeys} from './ScreenKeys';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import hideBottomTabBarMethod from './utils/hideBottomTabBarMethod';
import {useLayoutEffect} from 'react';
import {CreateCardScreen, CreateDeckScreen} from 'src/screens';
import {CreateCardTopAppBar} from 'src/screens/screenTopAppBars';

const CreateStack = createNativeStackNavigator();

export default function CreateCardTypeStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [ScreenKeys.BLANK];
    hideBottomTabBarMethod({tabHiddenRoutes, navigation, route});
  }, [navigation, route]);
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen
        name={ScreenKeys.CREATE_DECK}
        component={CreateDeckScreen}
        options={{headerShown: false}}
      />
      <CreateStack.Screen
        name={ScreenKeys.CREATE_CARD}
        component={CreateCardScreen}
        options={{
          header: () => <CreateCardTopAppBar />,
        }}
      />
    </CreateStack.Navigator>
  );
}
