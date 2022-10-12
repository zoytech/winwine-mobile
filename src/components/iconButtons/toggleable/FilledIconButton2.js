import React, {useState} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant} from 'src/themes';
import DefaultIconButtonStyle from './defaultIconButtonStyle';
import {FilledButton} from '../../buttons';

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
      //TODO: remove demo background
      containerStyle: {backgroundColor: 'blue'},
      contentStyle: {color: onBaseColor},
    };
  }
  return {
    //TODO: remove demo background
    containerStyle: {backgroundColor: 'red'},
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
    children,
    name,
    ...otherProps
  } = props;
  const [pressed, setPressed] = useState(false);

  const {containerStyle, contentStyle} = generateStateStyles(
    pressed,
    disabled,
    colorVariant,
  );

  function handlePressOut() {
    setPressed(false);
  }

  function handlePressIn() {
    setPressed(true);
  }

  function renderContent() {
    return (
      content && <Text style={[contentStyle, rawContentStyle]}>{content}</Text>
    );
  }

  return (
    <FilledButton>
      <Icon name={name} />
    </FilledButton>
  );
}
