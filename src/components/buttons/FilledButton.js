import React from 'react';
import {Text} from 'react-native';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import BaseButton from './BaseButton';

function generateStateStyles(pressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const level_088 = StateLayers.light[StateLayersVariant.surface]?.level_088;
    const onSurface = Color.light[ColorVariant.surface]?.onBase;
    return {
      containerStyle: {backgroundColor: level_088},
      contentStyle: {color: onSurface},
    };
  }
  const {onBase: onBaseColor, base: baseColor} = Color.light[colorVariant];
  if (pressed) {
    const layerColor = StateLayers.light[StateLayersVariant.primary]?.level_088;

    return {
      containerStyle: {backgroundColor: layerColor},
      contentStyle: {color: onBaseColor},
    };
  }
  return {
    containerStyle: {backgroundColor: baseColor},
    contentStyle: {color: onBaseColor},
  };
}

export default function FilledButton(props) {
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
