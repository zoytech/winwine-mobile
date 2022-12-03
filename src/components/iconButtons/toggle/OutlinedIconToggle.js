import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {BaseButton} from 'src/components';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

function getStateStyles({pressed, disabled}) {
  if (disabled) {
    const {level_012: layerColor, level_038: textColor} =
      StateLayers.light[StateLayersVariant.onSurface];
    return {
      containerStyle: {
        backgroundColor: 'transparent',
        borderColor: layerColor,
        borderWidth: 0.5,
      },
      contentStyle: {color: textColor},
      iconColor: textColor,
    };
  }
  const {onBase: onBaseColor} = Color.light[ColorVariant.surface];
  const {base: baseOutlineColor} = Color.light[ColorVariant.outline];
  const layerColor = StateLayers.light[StateLayersVariant.onSurface]?.level_012;
  return {
    containerStyle: {
      backgroundColor: pressed ? layerColor : 'transparent',
      borderColor: baseOutlineColor,
      borderWidth: 0.5,
    },
    contentStyle: {color: onBaseColor},
    iconColor: onBaseColor,
  };
}

export default function OutlinedIconToggle(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    name,
    disabled,
    children,
    ...otherProps
  } = props;

  function getContainerStyle({pressed}) {
    return [
      DefaultIconButtonStyle.container,
      getStateStyles({pressed, disabled})?.containerStyle,
      style,
    ];
  }

  function renderContent({pressed}) {
    const {contentStyle, iconColor} = getStateStyles({
      pressed,
      disabled,
    });
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
