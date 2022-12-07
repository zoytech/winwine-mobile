import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text} from 'react-native';
import HomeStackScreen from './HomeStackScreen';
import {BlankScreen} from '../screens';
import {ScreenKeys} from './ScreenKeys';
import TestScreen from '../screens/TestScreen';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from '../themes';

const Tab = createMaterialBottomTabNavigator();

function TabScreenIcon(props) {
  const {color, name, size} = props;
  const iconProps = {
    name: name ? name : 'arrow',
    size: size ? size : 26,
    color: color,
  };
  return <Icon {...iconProps} />;
}

function TabBarLabel({content}) {
  const {base: primaryColor, onBase: onPrimaryColor} =
    Color.light[ColorVariant.primary];
  return <Text style={[styles.label, {color: onPrimaryColor}]}>{content}</Text>;
}

export default function TabStackScreen() {
  const backgroundLayer =
    StateLayers.light[StateLayersVariant.background]?.level_068;
  const primaryLayer = StateLayers.light[StateLayersVariant.primary]?.level_068;
  const {base: primaryColor, onBase: onPrimaryColor} =
    Color.light[ColorVariant.primary];
  const secondColor = Color.light[ColorVariant.secondary]?.container;

  const barStyle = [styles.bar, {backgroundColor: primaryLayer}];
  const screenOptionsProps = {
    tabBarColor: backgroundLayer,
  };
  return (
    <Tab.Navigator
      initialRouteName={'HomeStackScreen'}
      activeColor={primaryColor}
      inactiveColor={secondColor}
      shifting={true}
      barStyle={barStyle}
      screenOptions={screenOptionsProps}>
      <Tab.Screen
        name={'HomeStackScreen'}
        component={HomeStackScreen}
        options={{
          tabBarLabel: <TabBarLabel content={'Home'} />,
          tabBarIcon: props => <TabScreenIcon {...props} name={'home'} />,
        }}
      />
      <Tab.Screen
        name={ScreenKeys.BLANK}
        component={BlankScreen}
        options={{
          tabBarLabel: <TabBarLabel content={'Blank'} />,
          tabBarIcon: props => <TabScreenIcon {...props} name={'pluscircle'} />,
        }}
      />
      <Tab.Screen
        name={'Test'}
        component={TestScreen}
        options={{
          tabBarLabel: <TabBarLabel content={'Test'} />,
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
