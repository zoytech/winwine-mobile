import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  FilledButton,
  GameCard,
  HeadlineBase,
  HeadlineInfo,
  MonoGram,
  OutlinedButton,
  ReviewCard,
} from '../../components';

import {ColorVariant} from '../../themes/color';
import {Color, Typography} from '../../themes';
import {gameCardLayout} from './layoutScreen';
import {Header, SubHeader} from '../../components/headline/HeadlineInfo';

export default function GameScreen(props) {
  const {
    typoHeader = Typography.title.large,
    typoSubHeader = Typography.label.large,
    typoBody = Typography.body.large,
    colorVariant = ColorVariant.surface,
  } = props;
  const {base} = Color.light[colorVariant];
  const {
    container: containerStyle,
    headline: headlineStyle,
    mainContent: mainContentStyle,
    action: actionStyle,
  } = gameCardLayout;
  const screenStyle = [{backgroundColor: base}, containerStyle];
  const bodyTextStyle = [typoBody, styles.content];
  const {id, title, currentCard, totalCards, avatar} = cardInfo;

  const handlePressFilledButton = () => {
    alert('move to new card');
  };
  const handlePressOutlinedButton = () => {
    alert('move to previous card');
  };
  return (
    <SafeAreaView style={screenStyle}>
      <HeadlineBase style={headlineStyle}>
        <MonoGram initial={avatar} />
        <HeadlineInfo>
          <Header content={title} contentStyle={typoHeader} />
          <SubHeader
            contentLeft={`Lá thứ ${currentCard}/${totalCards}`}
            contentStyle={typoSubHeader}
          />
        </HeadlineInfo>
      </HeadlineBase>
      <View style={mainContentStyle}>
        <GameCard contentStyle={bodyTextStyle} />
      </View>
      <View style={actionStyle}>
        <OutlinedButton
          content={'Lá trước'}
          onPress={handlePressOutlinedButton}
        />
        <FilledButton
          content={'Lá kế tiếp'}
          onPress={handlePressFilledButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
const cardInfo = {
  id: '123',
  title: 'Bai cua Nam',
  tag: 'Thieu nhi',
  totalCards: '30',
  avatar: 'N',
  currentCard: '28',
};
