import React from 'react';
import {Pressable, Text} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import DefaultButtonStyle from './defaultButtonStyle';

function generateStateStyles(pressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const {onBase: onBaseColor, base: baseColor} =
      Color.light[ColorVariant.surface];
    return {
      containerStyle: {backgroundColor: baseColor},
      contentStyle: {color: onBaseColor},
    };
  }
  const {base: containerColor, onBase: onContainerColor} =
    Color.light[colorVariant];
  if (pressed) {
    return {
      containerStyle: {backgroundColor: containerColor},
      contentStyle: {color: onContainerColor},
    };
  }
  return {
    containerStyle: {backgroundColor: containerColor},
    contentStyle: {color: onContainerColor},
  };
}

export default function ElevatedButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorVariant = ColorVariant.surfaceVariant,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    ...otherProps
  } = props;

  function getContainerStyle({pressed}) {
    return [
      DefaultButtonStyle.container,
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
        {children}
        {content && (
          <Text style={[typographyVariant, contentStyle, rawContentStyle]}>
            {content}
          </Text>
        )}
      </>
    );
  }

  return (
    <Pressable {...otherProps} disabled={!!disabled} style={getContainerStyle}>
      {renderContent}
    </Pressable>
  );
}
