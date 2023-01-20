import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {TabScreenIcon, TabScreenLabel} from './components';
import HomeStackScreen from './HomeStackScreen';
import AuthenticStackScreen from './AuthenticStackScreen';
import {ScreenKeys} from './ScreenKeys';
import LibraryStackScreen from './LibraryStackScreen';

const Tab = createBottomTabNavigator();

//TODO: namnt refactor cardDeck for library screens
export default function TabStackScreen() {
  const screenOptionsProps = {
    headerShown: false,
    tabBarItemStyle: styles.item,
    tabBarHideOnKeyboard: true,
  };
  return (
    <Tab.Navigator
      initialRouteName={ScreenKeys.HOME_STACK}
      screenOptions={screenOptionsProps}>
      <Tab.Screen
        name={ScreenKeys.HOME_STACK}
        component={HomeStackScreen}
        options={{
          tabBarLabel: props => <TabScreenLabel {...props} content={'Home'} />,
          tabBarIcon: props => <TabScreenIcon {...props} name={'home'} />,
        }}
      />
      <Tab.Screen
        name={ScreenKeys.LIBRARY_STACK}
        component={LibraryStackScreen}
        options={{
          tabBarLabel: props => (
            <TabScreenLabel {...props} content={'Library'} />
          ),
          tabBarIcon: props => <TabScreenIcon {...props} name={'switcher'} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
    width: 100,
    paddingHorizontal: 10,
  },
});
