import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {ShadowPresets, SurfacesColor} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function ElevatedCard(props) {
  const {style, children, ...otherProps} = props;

  const shadowProps = ShadowPresets.normal;
  const defaultContainerStyle = DefaultCardStyle.container;
  const {surface1} = SurfacesColor.light;
  const containerStyle = [
    defaultContainerStyle,
    {backgroundColor: surface1},
    style,
  ];
  const shadowStyle = [styles.shadow, style];
  return (
    <Shadow {...shadowProps} style={shadowStyle}>
      <View {...otherProps} style={containerStyle}>
        {children}
      </View>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 12,
  },
});
