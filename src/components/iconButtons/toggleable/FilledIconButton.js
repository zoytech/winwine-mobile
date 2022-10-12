import React, {useState} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import hexToRgba from 'hex-to-rgba';
import {Color, ColorVariant} from 'src/themes';

function generateStateStyles(isPressed, isDisabled, colorVariant) {
  if (isDisabled) {
    return {
      backgroundColor: baseColor,
      color: onBaseColor,
    };
  }
  const {onBase: onBaseColor, base: baseColor} = Color.light[colorVariant];
  if (isPressed) {
    return {
      backgroundColor: baseColor,
      color: onBaseColor,
    };
  }
  return {};
}

export default function FilledIconButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    colorVariant = ColorVariant.primary,
    disabled,
    pressed,
    children,
    ...otherProps
  } = props;
  const [pressedStyle, setPressedStyle] = useState(false);
  const {onBase: onSurface, base: surfaceColor} =
    Color.light[ColorVariant.surface];
  const {onBase: onBaseColor, base: baseColor} = Color.light[colorVariant];

  const getContainerProps = {
    borderRadius: 100,
    size: 24,
    backgroundColor: disabled
      ? surfaceColor
      : pressed
      ? hexToRgba(baseColor, 0.8)
      : baseColor,
    color: disabled
      ? onSurface
      : pressed
      ? hexToRgba(onBaseColor, 0.8)
      : onBaseColor,
  };

  function renderContent() {
    const contentStyle = generateStateStyles(
      pressed,
      disabled,
      colorVariant,
    )?.contentStyle;
    return content && <Text style={contentStyle}>{content}</Text>;
  }

  const handleIconButtonPress = () => {
    setPressedStyle(!pressedStyle);
  };
  return (
    <Icon.Button {...otherProps} {...getContainerProps}>
      {renderContent}
    </Icon.Button>
  );
}
