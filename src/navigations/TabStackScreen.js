import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {TabScreenIcon, TabScreenLabel} from './components';
import HomeStackScreen from './HomeStackScreen';
import CreateCardTypeStackScreen from './CreateCardTypeStackScreen';
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
        name={ScreenKeys.AUTHENTICATION}
        component={CreateCardTypeStackScreen}
        options={{
          tabBarLabel: props => (
            <TabScreenLabel {...props} content={'Search'} />
          ),
          tabBarIcon: props => <TabScreenIcon {...props} name={'search1'} />,
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
