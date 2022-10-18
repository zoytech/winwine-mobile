import React from 'react';
import {Text} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import BaseButton from './BaseButton';

function generateStateStyles(pressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const {onBase: onBaseColor} = Color.light[ColorVariant.surface];
    return {
      contentStyle: {color: onBaseColor},
    };
  }
  const {base: baseColor} = Color.light[colorVariant];
  if (pressed) {
    return {
      containerStyle: {backgroundColor: 'transparent'},
      contentStyle: {color: baseColor},
    };
  }
  return {
    containerStyle: {backgroundColor: 'transparent'},
    contentStyle: [{color: baseColor}],
  };
}

export default function TextButton(props) {
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
