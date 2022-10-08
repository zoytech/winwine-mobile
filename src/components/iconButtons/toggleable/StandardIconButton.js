import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

export default function StandardIconButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorPrimary = ColorVariant.primary,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    ...otherProps
  } = props;
  const stateLayersPrimary = StateLayersVariant.primary,
    stateLayersOnSurface = StateLayersVariant.onSurface;

  function generateStateStyles(pressed, isDisabled) {
    const defaultContainerStyle = DefaultIconButtonStyle.container;
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
