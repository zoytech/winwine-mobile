import React from 'react';
import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import BaseChip from './BaseChip';
import defaultChipStyle from './defaultChipStyle';
import {Color, ColorVariant} from 'src/themes';
import {StandardIconButton} from '../iconButtons';

export default function InputChip(props) {
  const {
    icon,
    image,
    hasTrailingIcon = false,
    iconStyle,
    imageStyle,
    style,
    ...otherProps
  } = props;

  const primary = Color.light[ColorVariant.primary]?.base;
  const {leftComponent, avatar, iconButton} = defaultChipStyle;
  const containerStyle = [
    {paddingRight: hasTrailingIcon === true ? 0 : 12},
    style,
  ];

  function renderLeftComponent() {
    const defaultAvatarStyle = [avatar, imageStyle];
    const iconProps = {
      name: icon,
      size: 18,
      color: primary,
      style: leftComponent,
      ...iconStyle,
    };
    if (icon) {
      return <Icon {...iconProps} />;
    }
    if (image) {
      return (
        <View style={leftComponent}>
          <Image source={image} style={defaultAvatarStyle} />
        </View>
      );
    }
    return null;
  }

  function renderRightComponent() {
    const iconContainerStyle = [iconButton];
    const iconProps = {
      name: 'close',
      size: 18,
      color: primary,
      ...iconStyle,
    };
    if (hasTrailingIcon && hasTrailingIcon === true) {
      return (
        <StandardIconButton
          name={'close'}
          iconStyle={iconProps}
          style={iconContainerStyle}
        />
      );
    }
    return null;
  }

  return (
    <BaseChip
      {...otherProps}
      style={containerStyle}
      LeftComponent={renderLeftComponent()}
      RightComponent={renderRightComponent()}
    />
  );
}
