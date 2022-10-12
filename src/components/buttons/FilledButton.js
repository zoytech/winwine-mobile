import React from 'react';
import {Pressable, Text, View} from 'react-native';
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
  const {onBase: onBaseColor, base: baseColor} = Color.light[colorVariant];
  if (pressed) {
    return {
      containerStyle: {backgroundColor: baseColor},
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
