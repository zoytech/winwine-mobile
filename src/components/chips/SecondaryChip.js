import React from 'react';
import {Pressable, Text} from 'react-native';
import {
  Color,
  ColorVariant,
  Elevations,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import DefaultChipStyle from './defaultChipStyle';

export default function SecondaryChip(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorSecondary = ColorVariant.secondary,
    elevationVariant = Elevations.light,
    stateLayersOnSecondary = StateLayersVariant.secondaryContainer,
    stateLayersOnSurface = StateLayersVariant.onSurface,
    typographyVariant = Typography.label.large,
    disabled,
    dragged,
    children,
    ...otherProps
  } = props;

  function generateStateStyles(pressed, isDisabled, isDragged) {
    const defaultContainerStyle = DefaultChipStyle.container;
    const defaultContentStyle = typographyVariant;
    const {elevation1, elevation2, elevation3} = elevationVariant;
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
    const {level_012, level_016} = StateLayers.light[stateLayersOnSecondary];
    if (pressed) {
      return {
        containerStyle: [
          defaultContainerStyle,
          elevation2,
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
    if (isDragged) {
      return {
        containerStyle: [
          defaultContainerStyle,
          elevation3,
          {backgroundColor: level_016},
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
        elevation1,
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
    return generateStateStyles(pressed, disabled, dragged)?.containerStyle;
  }

  function renderContent({pressed}) {
    const contentStyle = generateStateStyles(
      pressed,
      disabled,
      dragged,
    )?.contentStyle;
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
