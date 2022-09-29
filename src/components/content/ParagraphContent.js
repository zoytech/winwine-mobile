import {ColorVariant} from '../../themes/color';
import React from 'react';
import {Color, Typography} from '../../themes';
import {Text} from 'react-native';
import textTypeStyle from './textTypeStyle';

export default function ParagraphContent(props) {
  const {
    content,
    colorVariant = ColorVariant.primary,
    typographyVariant = Typography.body.large,
    contentStyle,
  } = props;
  const {onContainer} = Color.light[colorVariant];
  const textStyle = [
    typographyVariant,
    {color: onContainer},
    textTypeStyle.paragraph,
    contentStyle,
  ];

  return (
    <Text style={textStyle}>
      {content ? content : 'require paragraph here ...'}
    </Text>
  );
}
