import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {GameScreen, HomeScreen} from '../screens';
import {ScreenKeys} from './ScreenKeys';
import APP_NAME from "../constants";
import {ColorVariant} from "../themes/color";
import {Color, Typography} from "../themes";

const Stack = createNativeStackNavigator();

export default function RootNavigator(props) {
    const {
        colorVariant = ColorVariant.surface,
        typography = Typography.headline.large
    } = props;
    const {base, onBase} = Color.light[colorVariant];
    const headerShadowVisible = {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    };
    const headerStyle = {
        headerTintColor: onBase,
        headerTitleAlign: "center",
        headerBackGround: base,
        // headerTransparent: true,
    }
    return (
        <NavigationContainer
            initialRouteName={ScreenKeys.HOME}
        >
            <Stack.Navigator>
                <Stack.Screen
                    name={ScreenKeys.HOME}
                    component={HomeScreen}
                    options={{
                        title: APP_NAME,
                        ...headerStyle,
                        ...headerShadowVisible,
                    }}
                />
                <Stack.Screen
                    name={ScreenKeys.GAME_PLAY}
                    component={GameScreen}
                    options={{title: 'Bai cua Nam'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// <NavigationContainer>
//     <Stack.Navigator initialRouteName={ScreenKeys.GAME_PLAY}>
//         <Stack.Screen name={ScreenKeys.GAME_PLAY} component={GameScreen}/>
//         <Stack.Screen name={ScreenKeys.HOME} component={HomeScreen}/>
//     </Stack.Navigator>
// </NavigationContainer>
