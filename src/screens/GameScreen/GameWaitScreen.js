import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  FilledButton,
  HeadlineBase,
  HeadlineInfo,
  MediumGameCard,
  MonoGram,
} from '../../components';

import {ColorVariant} from '../../themes';
import {Color, Typography} from '../../themes';
import {gameCardLayout} from './layoutScreen';
import {Header, SubHeader} from './components/cardComponents/Headline';
import PreviewCard from './components/PreviewCard';

export default function GameWaitScreen(props) {
  const {
    typoHeader = Typography.title.large,
    typoSubHeader = Typography.label.large,
    typoSupportingText = Typography.title.medium,
    typoBody = Typography.body.large,
    colorVariant = ColorVariant.surface,
  } = props;
  const {base} = Color.light[colorVariant];
  const {
    container: containerStyle,
    headline: headlineStyle,
    supportingText: supportingTextStyle,
    mainContent: mainContentStyle,
    action: actionStyle,
  } = gameCardLayout;
  const screenStyle = [{backgroundColor: base}, containerStyle];
  const bodyTextStyle = [typoBody, styles.content];
  const {id, title, tag, totalCards, avatar} = cardInfo;

  const content = 'Xem trước 10 lá bài';

  const handlePressFilledButton = () => {
    alert('move to game screen');
  };

  function renderItemPreviewCard(item) {
    return (
      <PreviewCard style={styles.previewCardItem} content={item?.content} />
    );
  }

  return (
    <SafeAreaView style={screenStyle}>
      <HeadlineBase style={headlineStyle}>
        <MonoGram initial={avatar} />
        <HeadlineInfo>
          <Header content={title} contentStyle={typoHeader} />
          <SubHeader
            contentLeft={tag}
            contentRight={`Tổng số ${totalCards} lá`}
            contentStyle={typoSubHeader}
          />
        </HeadlineInfo>
      </HeadlineBase>
      <View style={supportingTextStyle}>
        {content && <Text style={typoSupportingText}>{content}</Text>}
      </View>
      <View style={mainContentStyle}>
        <MediumGameCard contentStyle={bodyTextStyle} />
      </View>
      <View style={actionStyle}>
        <FilledButton content={'Chơi ngay'} onPress={handlePressFilledButton} />
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
  previewCardItem: {
    width: 100,
    height: 300,
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
