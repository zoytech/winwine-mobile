import React from 'react';
import BaseChip from './BaseChip';
import {StandardIconButton} from 'src/components';
import defaultChipStyle from './defaultChipStyle';
import {Color, ColorVariant} from 'src/themes';

export default function AssistChip(props) {
  const {icon, iconStyle, img, imgStyle, style, ...otherProps} = props;

  function renderLeftComponent() {
    const primary = Color.light[ColorVariant.primary]?.base;
    const iconProps = {
      name: icon,
      size: 18,
      color: primary,
      ...iconStyle,
    };
    const {iconContainer, leftComponent} = defaultChipStyle;
    return (
      <>
        {icon && (
          <StandardIconButton
            iconStyle={iconProps}
            style={[iconContainer, leftComponent]}
          />
        )}
      </>
    );
  }

  return (
    <BaseChip
      {...otherProps}
      style={style}
      LeftComponent={renderLeftComponent()}
    />
  );
}
