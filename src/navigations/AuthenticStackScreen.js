import {ScreenKeys} from './ScreenKeys';
import {CenterTopBar} from 'src/components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import hideBottomTabBarMethod from './utils/hideBottomTabBarMethod';
import {useLayoutEffect} from 'react';
import {SignInScreen} from '../screens/authenticationScreens';

const CreateStack = createNativeStackNavigator();

export default function AuthenticStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [ScreenKeys.BLANK];
    hideBottomTabBarMethod({tabHiddenRoutes, navigation, route});
  }, [navigation, route]);
  return (
    <CreateStack.Navigator initialRouteName={ScreenKeys.BLANK}>
      <CreateStack.Screen
        name={ScreenKeys.SIGNUP_AU}
        component={SignInScreen}
        options={{
          header: () => <CenterTopBar />,
        }}
      />
    </CreateStack.Navigator>
  );
}
