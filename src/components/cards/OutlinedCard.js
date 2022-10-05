import React from 'react';
import {View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function OutlinedCard(props) {
  const {style, children, ...otherProps} = props;

  const colorOutline = ColorVariant.outline;
  const colorSurface = ColorVariant.surface;
  const defaultContainerStyle = DefaultCardStyle.container;
  const {base: outlineColor} = Color.light[colorOutline];
  const {base: surfaceColor} = Color.light[colorSurface];

  const containerStyle = [
    defaultContainerStyle,
    {
      backgroundColor: surfaceColor,
      borderColor: outlineColor,
      borderWidth: 0.5,
    },
    style,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      {children}
    </View>
  );
}
