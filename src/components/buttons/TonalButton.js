import React from 'react';
import {Pressable, Text} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import DefaultButtonStyle from './defaultButtonStyle';

function generateStateStyles(pressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const {onBase: onBaseColor} = Color.light[ColorVariant.surface];
    return {
      contentStyle: {color: onBaseColor},
    };
  }
  const {container: containerColor, onContainer: onContainerColor} =
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

export default function TonalButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorVariant = ColorVariant.secondary,
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
