import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StyleSheet} from 'react-native';
import HomeStackScreen from './HomeStackScreen';
import {ScreenKeys} from './ScreenKeys';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from '../themes';
import BlankStackScreen from './BlankStackScreen';
import LibraryStackScreen from './LibraryStackScreen';
import {TabScreenIcon, TabScreenLabel} from './components';

const Tab = createMaterialBottomTabNavigator();

export default function TabStackScreen2() {
  const backgroundLayer =
    StateLayers.light[StateLayersVariant.background]?.level_068;
  const primaryLayer = StateLayers.light[StateLayersVariant.primary]?.level_068;
  const primaryColor = Color.light[ColorVariant.primary]?.base;
  const secondColor = Color.light[ColorVariant.secondary]?.container;

  const screenOptionsProps = {
    tabBarColor: primaryLayer,
  };
  return (
    <Tab.Navigator
      initialRouteName={ScreenKeys.HOME_STACK}
      activeColor={primaryColor}
      inactiveColor={secondColor}
      shifting={true}
      screenOptions={screenOptionsProps}>
      <Tab.Screen
        name={ScreenKeys.HOME_STACK}
        component={HomeStackScreen}
        options={{
          tabBarLabel: <TabScreenLabel content={'Home'} />,
          tabBarIcon: props => <TabScreenIcon {...props} name={'home'} />,
        }}
      />
      <Tab.Screen
        name={ScreenKeys.BLANK_STACK}
        component={BlankStackScreen}
        options={{
          tabBarLabel: props => (
            <TabScreenLabel {...props} content={'Search'} />
          ),
          tabBarIcon: props => <TabScreenIcon {...props} name={'search'} />,
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
  bar: {
    position: 'absolute',
    height: 70,
  },
  label: {
    ...Typography.label.large,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
