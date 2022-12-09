import {ScreenKeys} from '../ScreenKeys';
import {BlankScreen} from '../../screens';
import {CenterTopBar} from 'src/components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useLayoutEffect} from 'react';
import showBottomTabBarMethod from '../hideBottomTabBarMethod';

const CreateStack = createNativeStackNavigator();

export default function BlankStackScreen({navigation, route}) {
  // useLayoutEffect(() => {
  //   const tabHiddenRoutes = [ScreenKeys.BLANK];
  //   showBottomTabBarMethod({tabHiddenRoutes, navigation, route});
  // }, [navigation, route]);
  return (
    <CreateStack.Navigator initialRouteName={ScreenKeys.BLANK}>
      <CreateStack.Screen
        name={ScreenKeys.BLANK}
        component={BlankScreen}
        options={{header: () => <CenterTopBar />}}
      />
    </CreateStack.Navigator>
  );
}
