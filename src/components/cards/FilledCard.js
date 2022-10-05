import React from 'react';
import {View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function FilledCard(props) {
  const {style, children, ...otherProps} = props;

  const colorVariant = ColorVariant.surfaceVariant;
  const defaultContainerStyle = DefaultCardStyle.container;
  const {base} = Color.light[colorVariant];
  const containerStyle = [
    defaultContainerStyle,
    {backgroundColor: base},
    style,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      {children}
    </View>
  );
}
