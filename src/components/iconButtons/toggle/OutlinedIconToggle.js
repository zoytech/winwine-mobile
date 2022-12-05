import React, {useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {BaseButton} from 'src/components';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

function getStateStyles({pressed, disabled, selected}) {
  if (disabled) {
    const {level_012: layerColor, level_038: textColor} =
      StateLayers.light[StateLayersVariant.onSurface];
    return {
      containerStyle: {
        backgroundColor: selected ? layerColor : 'transparent',
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

  if (selected) {
    const {surface: surfaceInv, onSurface: onSurfaceInv} =
      Color.light[ColorVariant.inverse];
    const layerInvColor =
      StateLayers.light[StateLayersVariant.surfaceInv]?.level_088;

    return {
      containerStyle: {
        backgroundColor: pressed ? layerInvColor : surfaceInv,
      },
      contentStyle: {color: onSurfaceInv},
      iconColor: onSurfaceInv,
    };
  }

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
    name,
    selectedName,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    disabled,
    children,
    ...otherProps
  } = props;
  const [selected, setSelected] = useState(false);

  function getContainerStyle({pressed}) {
    return [
      DefaultIconButtonStyle.container,
      getStateStyles({
        pressed,
        disabled,
        selected,
      })?.containerStyle,
      style,
    ];
  }

  function handleButtonToggle() {
    setSelected(!selected);
  }

  function renderContent({pressed}) {
    const {contentStyle, iconColor} = getStateStyles({
      pressed,
      disabled,
      selected,
    });
    const iconProps = {
      size: DefaultIconButtonStyle.icon.size,
      name: selectedName && selected ? selectedName : name,
      color: iconColor,
      ...iconStyle,
    };
    return (
      <>
        <Icon {...iconProps} />
        {content && <View style={contentStyle}>{content}</View>}
      </>
    );
  }

  return (
    <BaseButton
      {...otherProps}
      onPressOut={handleButtonToggle}
      disabled={disabled}
      style={getContainerStyle}>
      {renderContent}
    </BaseButton>
  );
}
