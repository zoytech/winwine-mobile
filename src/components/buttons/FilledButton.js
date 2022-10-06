import React from 'react';
import {Pressable, Text} from 'react-native';
import {
  Color,
  ColorVariant,
  Typography,
  StateLayersVariant,
  StateLayers,
} from 'src/themes';
import DefaultButtonStyle from './defaultButtonStyle';

export default function FilledButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorPrimary = ColorVariant.primary,
    stateLayersOnPrimary = StateLayersVariant.onPrimary,
    stateLayersOnSurface = StateLayersVariant.onSurface,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    ...otherProps
  } = props;

  function generateStateStyles(pressed, isDisabled) {
    const defaultContainerStyle = DefaultButtonStyle.container;
    const defaultContentStyle = typographyVariant;
    if (isDisabled) {
      const {level_012, level_032} = StateLayers.light[stateLayersOnSurface];
      return {
        containerStyle: [
          defaultContainerStyle,
          {backgroundColor: level_012},
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: level_032},
          rawContentStyle,
        ],
      };
    }

    const {onBase: onBaseColor, base: baseColor} = Color.light[colorPrimary];
    if (pressed) {
      const {level_012} = StateLayers.light[stateLayersOnPrimary];
      return {
        containerStyle: [
          defaultContainerStyle,
          {backgroundColor: level_012},
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: onBaseColor},
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
