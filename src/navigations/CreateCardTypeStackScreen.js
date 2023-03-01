import {ScreenKeys} from './ScreenKeys';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import hideBottomTabBarMethod from './utils/hideBottomTabBarMethod';
import {useLayoutEffect} from 'react';
import {
  CreateDeckScreen,
  CreateCardBottomSheet,
  BasicDialog,
} from 'src/screens';

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
        component={CreateCardBottomSheet}
        options={{headerShown: false}}
      />

      <CreateStack.Screen
        name={ScreenKeys.BASIC_DIALOG}
        component={BasicDialog}
        options={{headerShown: false}}
      />
    </CreateStack.Navigator>
  );
}
