import React from 'react';
import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant} from 'src/themes';
import BaseChip from './BaseChip';
import defaultChipStyle from './defaultChipStyle';

export default function AssistChip(props) {
  const {icon, image, iconStyle, imageStyle, style, ...otherProps} = props;

  function renderLeftComponent() {
    const primary = Color.light[ColorVariant.primary]?.base;
    const {leftComponent, avatar} = defaultChipStyle;
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

  return (
    <BaseChip
      {...otherProps}
      style={style}
      LeftComponent={renderLeftComponent()}
    />
  );
}
