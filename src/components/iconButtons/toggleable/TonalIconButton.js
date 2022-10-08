import React from 'react';
import {Pressable, View} from 'react-native';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

export default function TonalIconButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorSecondary = ColorVariant.secondary,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    ...otherProps
  } = props;
  const stateLayersOnSecondary = StateLayersVariant.onSecondaryContainer,
    stateLayersOnSurface = StateLayersVariant.onSurface;

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

    const {container, onContainer} = Color.light[colorSecondary];
    if (pressed) {
      const {level_012, level_032} = StateLayers.light[stateLayersOnSecondary];
      return {
        containerStyle: [
          defaultContainerStyle,
          {backgroundColor: level_012},
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: onContainer},
          rawContentStyle,
        ],
      };
    }
    return {
      containerStyle: [
        defaultContainerStyle,
        {backgroundColor: container},
        style,
      ],
      contentStyle: [
        defaultContentStyle,
        {color: onContainer},
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
