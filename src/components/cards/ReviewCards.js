import {FilledButton} from '../buttons';
import {StyleSheet, View} from 'react-native';
import {ColorVariant} from '../../themes/color';
import React from 'react';
import {Color} from '../../themes';
import {GameScript} from '../content';
import useCardStyle from './cardStyles';

export default function ReviewCards(props) {
  const cardStyle = useCardStyle.gameCard;
  const {container, headline, content, button} = cardStyle;
  const {
    colorBackgroundVariant = ColorVariant.surfaceVariant,
    // colorSurface = ColorVariant.surface,
    colorBorderVariant = ColorVariant.outline,
    ...otherProps
  } = props;
  const {base: contentBase} = Color.light[colorBackgroundVariant];
  const {base: borderBase} = Color.light[colorBorderVariant];
  const containerStyle = [
    styles.container,
    {
      backgroundColor: contentBase,
      borderColor: borderBase,
    },
    container,
  ];

  const mainContentStyle = [content];
  const buttonLayoutStyle = [button];

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={mainContentStyle}>
        <GameScript />
      </View>

      <View style={buttonLayoutStyle}>
        <FilledButton content={'Choi ngay'} message={'Chuyen vao main game'} />
      </View>
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 23,
    marginTop: 140,
    width: 314,
    height: 386,
  },
});

