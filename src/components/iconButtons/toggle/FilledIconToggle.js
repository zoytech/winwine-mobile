import React, {useState} from 'react';
import {Text} from 'react-native';
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
        backgroundColor: layerColor,
      },
      contentStyle: {color: textColor},
      iconColor: textColor,
    };
  }
  const {onBase: onBaseColor, base: baseColor} =
    Color.light[ColorVariant.primary];
  const baseSurVarColor = Color.light[ColorVariant.surfaceVariant]?.base;
  const baseSurVarLayer =
    StateLayers.light[StateLayersVariant.primary]?.level_088;
  if (selected) {
    const primaryLayer =
      StateLayers.light[StateLayersVariant.primary]?.level_088;
    return {
      containerStyle: {backgroundColor: pressed ? primaryLayer : baseColor},
      contentStyle: {color: onBaseColor},
      iconColor: onBaseColor,
    };
  }
  return {
    containerStyle: {
      backgroundColor: pressed ? baseSurVarLayer : baseSurVarColor,
    },
    contentStyle: {color: baseColor},
    iconColor: baseColor,
  };
}

export default function FilledIconToggle(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    name,
    selectedName,
    disabled = false,
    children,
    ...otherProps
  } = props;

  const [selected, setSelected] = useState(true);

  function getContainerStyle({pressed}) {
    return [
      DefaultIconButtonStyle.container,
      getStateStyles({pressed, disabled, selected})?.containerStyle,
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
        {content && (
          <Text style={[contentStyle, rawContentStyle]}>{content}</Text>
        )}
      </>
    );
  }

  return (
    <BaseButton
      {...otherProps}
      onPressOut={handleButtonToggle}
      style={getContainerStyle}>
      {renderContent}
    </BaseButton>
  );
}
