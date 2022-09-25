import React from 'react';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import ButtonItem from './buttonItem/ButtonItem';

export default function FilledButton(props) {
  const {
    content,
    message,
    style,
    colorVariant = ColorVariant.primary,
    typographyVariant = Typography.label.large,
    children,
    ...otherProps
  } = props;

  const {onBase, base} = Color.light[colorVariant];
  const containerStyle = [{backgroundColor: base}, style];
  const textContainerStyle = [style];
  const textStyle = [typographyVariant, {color: onBase}];

  return (
    <ButtonItem
      {...otherProps}
      style={{
        button: containerStyle,
        textArea: textContainerStyle,
        text: textStyle,
      }}
      content={content}
      message={message}
    />
  );
}

const Contentt = 'Play now';
