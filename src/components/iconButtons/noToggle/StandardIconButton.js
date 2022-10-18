import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant} from 'src/themes';
import DefaultIconButtonStyle from './defaultIconButtonStyle';
import BaseButton from '../../buttons/BaseButton';

function getStateStyles(isPressed, isDisabled, colorVariant) {
  if (isDisabled) {
    const {onBase: onBaseColor} = Color.light[ColorVariant.surface];
    return {
      containerStyle: {
        backgroundColor: 'transparent',
      },
      contentStyle: {color: onBaseColor},
      iconColor: {color: onBaseColor},
    };
  }
  const {onBase: onBaseColor} = Color.light[colorVariant];
  if (isPressed) {
    return {
      containerStyle: {
        backgroundColor: 'lightgrey',
      },
      contentStyle: {color: onBaseColor},
      iconColor: onBaseColor,
    };
  }
  return {
    containerStyle: {
      backgroundColor: 'transparent',
    },
    contentStyle: {color: onBaseColor},
    iconColor: onBaseColor,
  };
}

export default function StandardIconButton(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    name,
    colorVariant = ColorVariant.primary,
    disabled,
    children,
    ...otherProps
  } = props;

  function getContainerStyle({pressed}) {
    return [
      DefaultIconButtonStyle.container,
      getStateStyles(pressed, disabled, colorVariant)?.containerStyle,
      style,
    ];
  }

  function renderContent({pressed}) {
    const {contentStyle, iconColor} = getStateStyles(
      pressed,
      disabled,
      colorVariant,
    )?.contentStyle;
    const iconProps = {
      size: DefaultIconButtonStyle.icon.size,
      name: name,
      color: iconColor,
    };
    return (
      <>
        <Icon {...iconProps} />
        {content && <View style={contentStyle}>{content}</View>}
      </>
    );
  }

  return (
    <BaseButton {...otherProps} style={getContainerStyle}>
      {renderContent}
    </BaseButton>
  );
}
