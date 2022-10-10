import React, {useState} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant} from 'src/themes';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

function generateStateStyles(isPressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const {onBase: onBaseColor, base: baseColor} =
      Color.light[ColorVariant.surface];
    return {
      containerStyle: {backgroundColor: baseColor},
      contentStyle: {color: onBaseColor},
    };
  }
  const {onBase: onBaseColor, base: baseColor} = Color.light[colorVariant];
  if (isPressed) {
    return {
      containerStyle: {backgroundColor: baseColor},
      contentStyle: {color: onBaseColor},
    };
  }
  return {
    containerStyle: {backgroundColor: baseColor},
    contentStyle: {color: onBaseColor},
  };
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

  function getContainerStyle() {
    return [
      DefaultIconButtonStyle.container,
      generateStateStyles(pressed, disabled, colorVariant)?.containerStyle,
      style,
    ];
  }

  function renderContent() {
    const contentStyle = generateStateStyles(
      pressed,
      disabled,
      colorVariant,
    )?.contentStyle;
    console.log('contentStyle', contentStyle);
    return content && <Text style={contentStyle}>{content}</Text>;
  }

  const handleIconButtonPress = () => {
    console.log(pressedStyle);
    setPressedStyle(!pressedStyle);
  };
  return (
    <Icon.Button
      {...otherProps}
      onPress={handleIconButtonPress}
      size={DefaultIconButtonStyle.icon.size}
      backgroundColor={getContainerStyle}>
      {renderContent}
    </Icon.Button>
  );
}
