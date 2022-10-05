import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';
import Surfaces from '../../../themes/surfacesColor/surfaces';

const white_015 = 'rgba(0, 0, 0, 0.15)';
const white_030 = 'rgba(0, 0, 0, 0.30)';

export default function ShadowTest(props) {
  const {
    content,
    style,
    contentStyle,
    surfacesColor = Surfaces.light,
    children,
    ...otherProps
  } = props;
  const {first, second, third} = surfacesColor.surface5;
  return (
    <Shadow
      {...otherProps}
      distance={6}
      containerStyle={styles.container}
      style={styles.children}>
      <LinearGradient
        colors={[first, second, third]}
        useAngle={true}
        angle={0}
        angleCenter={{x: 0.5, y: 0.5}}
        style={styles.children}>
        <Text style={{margin: 20, fontSize: 20}}>🤯</Text>
        {children}
      </LinearGradient>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 30,
    // width: 100,
    // height: 30,
  },
  children: {
    borderRadius: 6,
    // borderBottomEndRadius: 20,
    width: 100,
    height: 30,
  },
});

/*
  <LinearGradient
        colors={[first, second, third]}
        useAngle={true}
        angle={0}
        angleCenter={{x: 0.5, y: 0.5}}
        style={styles.container}>

        {children}
      </LinearGradient>
 */
