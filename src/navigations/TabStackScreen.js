import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {TabScreenIcon, TabScreenLabel} from './components';
import HomeStackScreen from './HomeStackScreen';
import BlankStackScreen from './BlankStackScreen';
import {ScreenKeys} from './ScreenKeys';
import LibraryStackScreen from './LibraryStackScreen';

const Tab = createBottomTabNavigator();

export default function TabStackScreen() {
  const screenOptionsProps = {
    headerShown: false,
    tabBarItemStyle: styles.item,
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
        name={ScreenKeys.BLANK_STACK}
        component={BlankStackScreen}
        options={{
          tabBarLabel: props => <TabScreenLabel {...props} content={'Blank'} />,
          tabBarIcon: props => <TabScreenIcon {...props} name={'pluscircle'} />,
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
