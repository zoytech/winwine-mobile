import {useState} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, StateLayers, StateLayersVariant} from 'src/themes';
import {BaseButton} from 'src/components';
import DefaultIconButtonStyle from './defaultIconButtonStyle';

function getStateStyles({pressed, disabled, selected}) {
  if (disabled) {
    const level_038 =
      StateLayers.light[StateLayersVariant.onSurface]?.level_038;
    return {
      containerStyle: {
        backgroundColor: 'transparent',
      },
      contentStyle: {color: level_038},
      iconColor: level_038,
    };
  }
  const onBaseColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  const layerSurfaceVarColor =
    StateLayers.light[StateLayersVariant.onSurfaceVar]?.level_012;

  if (selected) {
    const baseColor = Color.light[ColorVariant.primary]?.base;
    const layerPrimaryColor =
      StateLayers.light[StateLayersVariant.primary]?.level_012;
    return {
      containerStyle: {
        backgroundColor: pressed ? layerPrimaryColor : 'transparent',
      },
      contentStyle: {color: baseColor},
      iconColor: baseColor,
    };
  }
  return {
    containerStyle: {
      backgroundColor: pressed ? layerSurfaceVarColor : 'transparent',
    },
    contentStyle: {color: onBaseColor},
    iconColor: onBaseColor,
  };
}

export default function StandardIconToggle(props) {
  const {
    content,
    style,
    contentStyle: rawContentStyle,
    iconStyle,
    name,
    selectedName,
    disabled,
    onSelectedItem = () => {},
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
    onSelectedItem();
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
    const contentStyles = [contentStyle, rawContentStyle];
    return (
      <>
        <Icon {...iconProps} />
        {content && <Text style={contentStyles}>{content}</Text>}
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
