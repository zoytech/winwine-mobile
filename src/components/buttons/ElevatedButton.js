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
import DefaultButtonStyle from './defaultButtonStyle';

export default function ElevatedButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorPrimary = ColorVariant.primary, // elevation = Elevations.light.elevation1,
    shadowStyle = ShadowPresets.button,
    stateLayersOnSurface = StateLayersVariant.onSurface,
    typographyVariant = Typography.label.large,
    disabled,
    children,
    ...otherProps
  } = props;

  function generateStateStyles(pressed, isDisabled) {
    const defaultContainerStyle = DefaultButtonStyle.container;
    const defaultContentStyle = typographyVariant;
    const {base: baseColor} = Color.light[colorPrimary];
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
    const {surface1, surface2} = SurfacesColor.light;
    if (pressed) {
      return {
        containerStyle: [
          defaultContainerStyle, // elevation,
          {backgroundColor: surface2},
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
        defaultContainerStyle, // elevation,
        {backgroundColor: surface1},
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
    <Shadow {...shadowStyle} style={styles.shadow}>
      <Pressable {...otherProps} style={getContainerStyle}>
        {renderContent}
      </Pressable>
    </Shadow>

    // <Pressable style={getContainerStyle}>{renderContent}</Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 100,
  },
});
