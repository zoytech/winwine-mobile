import React from 'react';
import {View} from 'react-native';
import {StateLayers, StateLayersVariant} from 'src/themes';
import DefaultCardStyle from './defaultCardStyle';

export default function OutlinedCard(props) {
  const {style, children, ...otherProps} = props;

  const layerColor = StateLayers.light[StateLayersVariant.outline]?.level_012;
  const layerBackgroundC =
    StateLayers.light[StateLayersVariant.surface]?.level_012;

  const containerStyle = [
    DefaultCardStyle.container,
    {
      backgroundColor: layerBackgroundC,
      borderColor: layerColor,
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

/*
const outlineColor = Color.light[ColorVariant.outline]?.base;
  const surfaceColor = Color.light[ColorVariant.surface]?.base;
 */
