import {ColorVariant} from '../../themes/color';
import React from 'react';
import {Color, Typography} from '../../themes';
import {Text, View} from 'react-native';
import textTypeStyle from './textTypeStyle';

export default function ParagraphContent(props) {
  const {
    colorVariant = ColorVariant.primary,
    typographyVariant = Typography.title.medium,
    style,
    contentStyle,
    children,
    ...otherProps
  } = props;
  const content = Content;
  const {onContainer} = Color.light[colorVariant];
  const textStyle = [
    typographyVariant,
    {color: onContainer},
    textTypeStyle.paragraph,
    contentStyle,
  ];

  return (
    <View {...otherProps}>
      {content && <Text style={textStyle}>{content}</Text>}
    </View>
  );
}

const Content =
  'Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào? a a/n' +
  'aff a ffkfaaf' +
  'kalfkl laklf ' +
  'afkaj aj' +
  'afjk ' +
  'ajfkjk jafjljl';
