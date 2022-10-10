import React from 'react';
import {View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function FilledCard(props) {
  const {style, children, ...otherProps} = props;

  const colorVariant = ColorVariant.surfaceVariant;
  const baseColor = Color.light[colorVariant]?.base;
  const containerStyle = [
    DefaultCardStyle.container,
    {backgroundColor: baseColor},
    style,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      {children}
    </View>
  );
}
