import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text} from 'react-native';
import HomeStackScreen from './HomeStackScreen';
import {BlankScreen} from '../screens';
import {ScreenKeys} from './ScreenKeys';
import TestScreen from '../screens/TestScreen';
import {StateLayers, StateLayersVariant, Typography} from '../themes';

const Tab = createMaterialBottomTabNavigator();

function TabScreenIcon(props) {
  const {color, focused, name, size} = props;
  const iconProps = {
    name: name ? name : 'arrow',
    size: size ? size : 26,
    color: color,
  };
  return <Icon {...iconProps} />;
}

function TabBarLabel({content}) {
  return <Text style={styles.label}>{content}</Text>;
}

export default function TabStackScreen() {
  const barColor = StateLayers.light[StateLayersVariant.background]?.level_068;
  const barStyle = [styles.bar, {backgroundColor: barColor}];
  return (
    <Tab.Navigator
      initialRouteName={'HomeStackScreen'}
      activeColor="#e91e63"
      barStyle={barStyle}>
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
  },
  label: {
    ...Typography.label.large,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
