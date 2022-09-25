import {FilledButton, UnfilledButtons} from '../buttons';
import {StyleSheet, View} from 'react-native';
import {ColorVariant} from '../../themes/color';
import React from 'react';
import {Color, Typography} from '../../themes';
import {ImageContent} from '../content';
import useCardStyle from './cardStyles';
import TextItem from '../content/TextItem';

export default function EndGameCard(props) {
  const cardStyle = useCardStyle.previewLarge;
  const {
    colorSurfaceVariant = ColorVariant.surfaceVariant,
    typography = Typography,
    content,
    ...otherProps
  } = props;
  const {base: cardBase} = Color.light[colorSurfaceVariant];
  const containerStyle = [styles.container, {backgroundColor: cardBase}];
  const imageAreaStyle = [styles.imageArea];
  const buttonStyle = [styles.buttonArea];
  const contentStyle = [styles.contentArea];

  return (
    <View {...otherProps} style={containerStyle}>
      <ImageContent containerStyle={imageAreaStyle} />
      <View style={contentStyle}>
        <TextItem content={'Bạn đã chơi hết bài'} />
      </View>

      <View style={buttonStyle}>
        <FilledButton
          colorVariant={ColorVariant.primary}
          content={'Bộ khác'}
          message={'Chuyển qua giao diện album bài'}
        />
        <UnfilledButtons
          colorVariant={ColorVariant.primary}
          colorOutline={ColorVariant.outline}
          colorSurface={ColorVariant.surface}
          content={'Chơi lại'}
          message={'Trở lại bộ bài vừa chơi'}
        />
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
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',

    width: 266,
    height: 254,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageArea: {
    flex: 6,
    backgroundColor: 'tomato',
  },
  contentArea: {
    flex: 2,
    alignSelf: 'center',
    backgroundColor: 'tan',
    justifyContent: 'center',
  },
  buttonArea: {
    flex: 2,

    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});

// backgroundCard: {
//     background: "linear-gradient(0deg, rgba(108, 92, 71, 0.05), rgba(108, 92, 71, 0.05)), #FFFBFF",
// },
// elevationLight: {
//     boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
//     borderRadius: 12,
// },
// flex: "none",
// order: 1,
// flexGrow: 0,

//        width: Dimensions.get('window').width,
