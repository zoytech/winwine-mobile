import React from 'react';
import {View} from 'react-native';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function FilledCard(props) {
  const {style, children, ...otherProps} = props;

  const layerColor = StateLayers.light[StateLayersVariant.primary]?.level_012;
  const backgroundColor = Color.light[ColorVariant.primary]?.container;
  const containerStyle = [
    DefaultCardStyle.container,
    {backgroundColor: backgroundColor},
    style,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      {children}
    </View>
  );
}
