import React from 'react';
import {Pressable, Text} from 'react-native';
import {Color, ColorVariant, StateLayers, Typography} from 'src/themes';
import DefaultButtonStyle from './defaultButtonStyle';

export default function FilledButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorPrimary = ColorVariant.primary,
    colorSurface = ColorVariant.surface,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    ...otherProps
  } = props;

  function generateStateStyles(pressed, isDisabled) {
    const defaultContainerStyle = DefaultButtonStyle.container;
    const defaultContentStyle = typographyVariant;

    if (isDisabled) {
      const surfaceColor = Color.light[colorSurface]?.onBase;
      return {
        containerStyle: [
          defaultContainerStyle,
          {backgroundColor: surfaceColor},
          StateLayers.pressed,
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: surfaceColor},
          StateLayers.disabled,
          rawContentStyle,
        ],
      };
    }

    const {onBase: onBaseColor, base: baseColor} = Color.light[colorPrimary];
    if (pressed) {
      return {
        containerStyle: [
          defaultContainerStyle,
          {backgroundColor: baseColor},
          StateLayers.pressed,
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: onBaseColor},
          StateLayers.pressed,
          rawContentStyle,
        ],
      };
    }
    return {
      containerStyle: [
        defaultContainerStyle,
        {backgroundColor: baseColor},
        style,
      ],
      contentStyle: [
        defaultContentStyle,
        {color: onBaseColor},
        rawContentStyle,
      ],
    };
  }

  function getContainerStyle({pressed}) {
    return generateStateStyles(pressed, disabled)?.containerStyle;
  }

  function renderContent({pressed}) {
    const contentStyle = generateStateStyles(pressed, disabled)?.contentStyle;
    return (
      <>
        {children}
        {content && <Text style={contentStyle}>{content}</Text>}
      </>
    );
  }

  return (
    <Pressable {...otherProps} style={getContainerStyle}>
      {renderContent}
    </Pressable>
  );
}
