import React from 'react';
import {Text} from 'react-native';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import BaseButton from './BaseButton';

function generateStateStyles(pressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const {level_012: layerColor, level_038: textColor} =
      StateLayers.light[StateLayersVariant.onSurface];
    return {
      containerStyle: {
        borderColor: layerColor,
        borderWidth: 0.5,
        backgroundColor: 'transparent',
      },
      contentStyle: {color: textColor},
    };
  }
  const baseOutlineColor = Color.light[ColorVariant.outline]?.base;
  const baseColor = Color.light[colorVariant]?.base;
  if (pressed) {
    const layerColor = StateLayers.light[StateLayersVariant.primary]?.level_012;
    return {
      containerStyle: {
        borderColor: baseOutlineColor,
        borderWidth: 0.5,
        backgroundColor: layerColor,
      },
      contentStyle: {color: baseColor},
    };
  }
  return {
    containerStyle: {
      borderColor: baseOutlineColor,
      borderWidth: 0.5,
      backgroundColor: 'transparent',
    },
    contentStyle: {color: baseColor},
  };
}

export default function OutlinedButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorVariant = ColorVariant.primary,
    disabled,
    children,
    ...otherProps
  } = props;

  function getContainerStyle({pressed}) {
    return [
      generateStateStyles(pressed, disabled, colorVariant)?.containerStyle,
      style,
    ];
  }

  function renderContent({pressed}) {
    const contentStyle = generateStateStyles(
      pressed,
      disabled,
      colorVariant,
    )?.contentStyle;
    return (
      <>
        {content && (
          <Text style={[contentStyle, rawContentStyle]}>{content}</Text>
        )}
      </>
    );
  }

  return (
    <BaseButton {...otherProps} style={getContainerStyle} disabled={!!disabled}>
      {renderContent}
    </BaseButton>
  );
}
