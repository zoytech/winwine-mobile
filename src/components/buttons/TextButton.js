import React from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {StateLayers, Typography} from '../../themes';
import {Pressable, Text} from 'react-native';
import DefaultButtonStyle from './defaultButtonStyle';

export default function TextButton(props) {
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
      const onSurfaceColor = Color.light[colorSurface]?.onBase;
      return {
        containerStyle: [defaultContainerStyle, style],
        contentStyle: [
          defaultContentStyle,
          {color: onSurfaceColor},
          StateLayers.disabled,
          rawContentStyle,
        ],
      };
    }
    const {base: baseColor} = Color.light[colorPrimary];
    if (pressed) {
      return {
        containerStyle: [defaultContainerStyle, StateLayers.pressed, style],
        contentStyle: [
          defaultContentStyle,
          {color: baseColor},
          StateLayers.pressed,
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
