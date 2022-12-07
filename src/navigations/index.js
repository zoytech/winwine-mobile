import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {BlankScreen} from 'src/screens';
import {ScreenKeys} from './ScreenKeys';
import {Text, View} from 'react-native';
import HomeStackScreen from './HomeStackScreen';
import TabBarScreen from './TabBarScreen';

const Tab = createMaterialBottomTabNavigator();

function DetailsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
    </View>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      {/*<Tab.Navigator tabBar={props => <TabBarScreen {...props} />}>*/}
      {/*  <Tab.Screen name={'HomeStackScreen'} component={HomeStackScreen} />*/}
      {/*  <Tab.Screen name={ScreenKeys.BLANK} component={BlankScreen} />{' '}*/}
      {/*  <Tab.Screen name={'DetailsScreen'} component={DetailsScreen} />*/}
      {/*</Tab.Navigator>*/}
      <Tab.Navigator
        initialRouteName={'HomeStackScreen'}
        activeColor="#e91e63"
        barStyle={{backgroundColor: 'lime'}}>
        <Tab.Screen
          name={'HomeStackScreen'}
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name={ScreenKeys.BLANK}
          component={BlankScreen}
          options={{
            tabBarLabel: 'Blank',
            tabBarIcon: ({color}) => (
              <Icon name="pluscircle" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name={'Detail'}
          component={DetailsScreen}
          options={{
            tabBarLabel: 'Detail',
            tabBarIcon: ({color}) => (
              <Icon name="switcher" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
