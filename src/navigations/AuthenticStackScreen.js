import {ScreenKeys} from './ScreenKeys';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import hideBottomTabBarMethod from './utils/hideBottomTabBarMethod';
import {useLayoutEffect} from 'react';
import {CreateActionScreen} from 'src/screens';

const CreateStack = createNativeStackNavigator();

export default function AuthenticStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [ScreenKeys.BLANK];
    hideBottomTabBarMethod({tabHiddenRoutes, navigation, route});
  }, [navigation, route]);
  return (
    <CreateStack.Navigator screenOptions={{headerShown: false}}>
      <CreateStack.Screen
        name={ScreenKeys.CREATE_ACTION}
        component={CreateActionScreen}
      />
    </CreateStack.Navigator>
  );
}
