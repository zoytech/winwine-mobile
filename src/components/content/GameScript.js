import {ColorVariant} from '../../themes/color';
import React from 'react';
import {Color, Typography} from '../../themes';
import TextContent, {TextContentVariant} from './textStyle';
import TextItem from './TextItem';

export default function GameScript(props) {
  const textVariant = TextContentVariant.paragraph;
  const {
    colorVariant = ColorVariant.primary,
    typographyVariant = Typography.title.medium,
    style,
    contentStyle,
    children,
    ...otherProps
  } = props;
  const {base, onBase} = TextContent[textVariant];
  const content = Content;
  const {onContainer} = Color.light[colorVariant];

  const containerStyle = [base, style];
  const textStyle = [typographyVariant, {color: onContainer}, onBase, style];

  return (
    <TextItem
      {...otherProps}
      containerStyle={containerStyle}
      contentStyle={textStyle}
      content={content}
    />
  );
}

const Content =
  'Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào? a a/n' +
  'aff a ffkfaaf' +
  'kalfkl laklf ' +
  'afkaj aj' +
  'afjk ' +
  'ajfkjk jafjljl';


