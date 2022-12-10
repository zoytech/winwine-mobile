import {ScreenKeys} from './ScreenKeys';
import {CenterTopBar} from 'src/components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import hideBottomTabBarMethod from './hideBottomTabBarMethod';
import {useLayoutEffect} from 'react';
import {BlankScreen} from 'src/screens';

const CreateStack = createNativeStackNavigator();

export default function BlankStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [ScreenKeys.BLANK];
    hideBottomTabBarMethod({tabHiddenRoutes, navigation, route});
  }, [navigation, route]);
  return (
    <CreateStack.Navigator initialRouteName={ScreenKeys.BLANK}>
      <CreateStack.Screen
        name={ScreenKeys.BLANK}
        component={BlankScreen}
        options={{
          header: () => <CenterTopBar />,
        }}
      />
    </CreateStack.Navigator>
  );
}