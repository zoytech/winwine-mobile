import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {BlankStackScreen, HomeStackScreen} from '../stackScreens';
import TestScreen from '../../screens/TestScreen';
import {TabScreenIcon, TabScreenLabel} from './components';

const Tab = createBottomTabNavigator();

export default function TabStackScreen2() {
  const surfaceColor = Color.light[ColorVariant.surface]?.base;
  const containerStyle = [styles.container, {backgroundColor: surfaceColor}];
  const itemStyleProps = {
    tabBarItemStyle: styles.item,
  };
  const screenOptionsProps = {
    headerShown: false,
    tabBarStyle: containerStyle,
    ...itemStyleProps,
  };
  return (
    <Tab.Navigator
      initialRouteName={'HomeStackScreen'}
      screenOptions={screenOptionsProps}>
      <Tab.Screen
        name={'HomeStackScreen'}
        component={HomeStackScreen}
        options={{
          tabBarLabel: props => <TabScreenLabel {...props} content={'Home'} />,
          tabBarIcon: props => <TabScreenIcon {...props} name={'home'} />,
        }}
      />
      <Tab.Screen
        name={'BlankStackScreen'}
        component={BlankStackScreen}
        options={{
          tabBarLabel: props => <TabScreenLabel {...props} content={'Blank'} />,
          tabBarIcon: props => <TabScreenIcon {...props} name={'pluscircle'} />,
        }}
      />
      <Tab.Screen
        name={'Test'}
        component={TestScreen}
        options={{
          tabBarLabel: props => <TabScreenLabel {...props} content={'Test'} />,
          tabBarIcon: props => <TabScreenIcon {...props} name={'switcher'} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
    width: 100,
    paddingHorizontal: 10,
  },
});
