import React from 'react';
import {View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function StandardCard(props) {
  const {style, children, ...otherProps} = props;
  const surfaceColor = Color.light[ColorVariant.surface]?.base;

  const containerStyle = [
    DefaultCardStyle.container,
    {
      backgroundColor: surfaceColor,
    },
    style,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      {children}
    </View>
  );
}
