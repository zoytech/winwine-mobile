import React from 'react';
import {View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function OutlinedCard(props) {
  const {style, children, ...otherProps} = props;

  const outlineColor = Color.light[ColorVariant.outline]?.base;
  const surfaceColor = Color.light[ColorVariant.surface]?.base;
  const containerStyle = [
    DefaultCardStyle.container,
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
