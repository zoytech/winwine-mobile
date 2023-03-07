import {ScreenKeys} from './ScreenKeys';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import hideBottomTabBarMethod from './utils/hideBottomTabBarMethod';
import {useLayoutEffect} from 'react';
import CreateProviderScreen from '../screens/actionScreens/CreateProviderScreen';

const CreateStack = createNativeStackNavigator();

export default function CreateCardTypeStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [ScreenKeys.CREATE_CARD];
    hideBottomTabBarMethod({tabHiddenRoutes, navigation, route});
  }, [navigation, route]);
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen
        name={ScreenKeys.CREATE_CARD}
        component={CreateProviderScreen}
        options={{headerShown: false}}
      />
    </CreateStack.Navigator>
  );
}
