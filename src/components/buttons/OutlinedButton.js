import React from 'react';
import {Pressable, Text} from 'react-native';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import DefaultButtonStyle from './defaultButtonStyle';

export default function OutlinedButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorPrimary = ColorVariant.primary,
    colorOutline = ColorVariant.outline, // stateLayersPrimary = StateLayersVariant.primary,
    stateLayersPrimary = StateLayersVariant.primary,
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
          {borderColor: level_012, borderWidth: 0.5},
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: level_032},
          rawContentStyle,
        ],
      };
    }
    const {base: baseColor, onBase: onBaseColor} = Color.light[colorPrimary];
    const {base: baseOutline} = Color.light[colorOutline];
    if (pressed) {
      const {level_012} = StateLayers.light[stateLayersPrimary];
      return {
        containerStyle: [
          defaultContainerStyle,
          {
            backgroundColor: level_012,
            borderColor: baseOutline,
            borderWidth: 0.5,
          },
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: baseColor},
          rawContentStyle,
        ],
      };
    }
    return {
      containerStyle: [
        defaultContainerStyle,
        {
          backgroundColor: onBaseColor,
          borderColor: baseOutline,
          borderWidth: 0.5,
        },
        style,
      ],
      contentStyle: [defaultContentStyle, {color: baseColor}, rawContentStyle],
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
