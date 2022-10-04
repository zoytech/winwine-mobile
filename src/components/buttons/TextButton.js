import React from 'react';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import {Pressable, Text} from 'react-native';
import DefaultButtonStyle from './defaultButtonStyle';

export default function TextButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorPrimary = ColorVariant.primary,
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
      const {level_032} = StateLayers.light[stateLayersOnSurface];
      return {
        containerStyle: [defaultContainerStyle, style],
        contentStyle: [
          defaultContentStyle,
          {color: level_032},
          rawContentStyle,
        ],
      };
    }
    const {base: baseColor} = Color.light[colorPrimary];
    if (pressed) {
      const {level_012} = StateLayers.light[stateLayersPrimary];
      return {
        containerStyle: [
          defaultContainerStyle,
          {backgroundColor: level_012},
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
      containerStyle: [defaultContainerStyle, style],
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
