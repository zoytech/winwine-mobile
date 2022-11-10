import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {
  Color,
  ColorVariant,
  ShadowPresets,
  StateLayers,
  StateLayersVariant,
  SurfacesColor,
  Typography,
} from 'src/themes';
import DefaultChipStyle from './defaultChipStyle';

export default function PrimaryChip(props) {
  const {
    content,
    children,
    style,
    contentStyle: rawContentStyle,
    containerStyle,
    colorVariant = ColorVariant.primary,
    typographyVariant = Typography.label.large,
    disabled,
    dragged,
    ...otherProps
  } = props;

  const stateLayersPrimary = StateLayersVariant.primary,
    shadowStyle = ShadowPresets.normal;

  function generateStateStyles(pressed, isDisabled, isDragged) {
    const defaultContainerStyle = DefaultChipStyle?.container;
    const defaultContentStyle = typographyVariant;
    const baseColor = Color.light[colorVariant]?.base;
    if (isDisabled) {
      const {level_088, level_064} =
        StateLayers.light[StateLayersVariant.surface];
      return {
        containerStyle: [
          defaultContainerStyle,
          {backgroundColor: level_088},
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: level_064},
          rawContentStyle,
        ],
      };
    }
    const {surface1} = SurfacesColor.light;
    const level_100 =
      StateLayers.light[StateLayersVariant.surfaceVar]?.level_100;
    const {level_012, level_016} = StateLayers.light[stateLayersPrimary];
    if (pressed) {
      return {
        containerStyle: [
          defaultContainerStyle,
          {
            backgroundColor: level_012,
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
    if (isDragged) {
      return {
        containerStyle: [
          defaultContainerStyle,
          {
            backgroundColor: level_016,
          },
          style,
        ],
        contentStyle: [
          defaultContentStyle,
          {color: level_100},
          rawContentStyle,
        ],
      };
    }
    return {
      containerStyle: [
        defaultContainerStyle,
        {backgroundColor: surface1},
        style,
      ],
      contentStyle: [defaultContentStyle, {color: baseColor}, rawContentStyle],
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
    <Shadow
      {...shadowStyle}
      style={styles.shadow}
      disabled={disabled}
      containerStyle={containerStyle}>
      <Pressable {...otherProps} style={getContainerStyle}>
        {renderContent}
      </Pressable>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 8,
  },
});
