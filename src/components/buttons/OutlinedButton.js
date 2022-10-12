import React from 'react';
import {Pressable, Text} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import DefaultButtonStyle from './defaultButtonStyle';

function generateStateStyles(pressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const {onBase: onBaseColor} = Color.light[ColorVariant.surface];
    return {
      containerStyle: {borderColor: onBaseColor, borderWidth: 0.5},
      contentStyle: {color: onBaseColor},
    };
  }
  const {base: baseColor} = Color.light[colorVariant];
  const {base: baseOutlineColor} = Color.light[ColorVariant.outline];
  if (pressed) {
    return {
      containerStyle: {
        borderColor: baseOutlineColor,
        borderWidth: 0.5,
      },
      contentStyle: {color: baseColor},
    };
  }
  return {
    containerStyle: {
      borderColor: baseOutlineColor,
      borderWidth: 0.5,
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
