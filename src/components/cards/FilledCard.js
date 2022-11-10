import React from 'react';
import {View} from 'react-native';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function FilledCard(props) {
  const {style, children, ...otherProps} = props;

  const layerColor = StateLayers.light[StateLayersVariant.primary]?.level_012;
  const containerStyle = [
    DefaultCardStyle.container,
    {backgroundColor: layerColor},
    style,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      {children}
    </View>
  );
}
