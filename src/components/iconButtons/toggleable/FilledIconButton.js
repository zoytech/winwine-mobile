import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  Color,
  ColorVariant,
  Typography,
  StateLayersVariant,
  StateLayers,
} from 'src/themes';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

export default function FilledIconButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorVariant = ColorVariant.primary,
    stateLayersOnPrimary = StateLayersVariant.onPrimary,
    stateLayersOnSurface = StateLayersVariant.onSurface,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    ...otherProps
  } = props;

  function generateStateStyles(pressed, isDisabled) {
    const defaultContainerStyle = DefaultIconButtonStyle.container;
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

    const {onBase: onBaseColor, base: baseColor} = Color.light[colorVariant];
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
        {content && <View style={contentStyle}>{content}</View>}
      </>
    );
  }

  return (
    <Pressable {...otherProps} style={getContainerStyle}>
      {renderContent}
    </Pressable>
  );
}
