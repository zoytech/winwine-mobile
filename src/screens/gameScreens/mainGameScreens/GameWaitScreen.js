import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {ElevatedCard, FilledButton, FilledIconButton} from 'src/components';
import {ElevatedHeader} from './components';

const {width: screenWidth} = Dimensions.get('screen');

export default function GameWaitScreen(props) {
  const {
    onBackwardButtonPressed = () => {},
    onForwardButtonPressed = () => {},
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    supportingTextTypo = Typography.title.medium,
    bodyTypo = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;

  const [currentCard, setCurrentCard] = useState(0);
  const baseColor = Color.light[colorVariant]?.base;

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
    style,
  ];
  const description = 'Xem trước 10 lá bài';

  function handlePressFilledButton() {
    alert('move to game screen');
  }

  function handleBackwardButtonPressed() {
    currentCard === 0 ? '' : setCurrentCard(currentCard - 1);
    onBackwardButtonPressed(item);
  }

  function handleForwardButtonPressed() {
    currentCard === questions.length ? '' : setCurrentCard(currentCard + 1);
    onForwardButtonPressed(item);
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ElevatedHeader
          head={cardInfo?.title}
          subHeadLeft={cardInfo?.tag}
          subHeadRight={`Tổng số ${questions.length} lá`}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />

        <View style={styles.supportingText}>
          {description && <Text style={supportingTextTypo}>{description}</Text>}
        </View>
        <View style={styles.cardWithButton}>
          <FilledIconButton
            name="caretleft"
            onPressOut={handleBackwardButtonPressed}
            disabled={currentCard === 0}
          />
          <ElevatedCard style={shadowStyle} containerStyle={styles.gameCard}>
            <Text style={[bodyTypo, styles.text]}>
              {questions[currentCard]?.question}
            </Text>
          </ElevatedCard>
          <FilledIconButton
            name="caretright"
            onPressOut={handleForwardButtonPressed}
            disabled={currentCard === questions.length - 1}
          />
        </View>
        <View style={styles.action}>
          <FilledButton
            content={'Choi ngay'}
            onPress={handlePressFilledButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    aspectRatio: 4,
  },
  supportingText: {
    width: '100%',
    aspectRatio: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWithButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    width: '70%',
    aspectRatio: 7 / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    width: '100%',
    aspectRatio: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

const shadowStyle = StyleSheet.compose(styles.gameCard, {width: '100%'});

const cardInfo = {
  id: '123',
  title: 'Bai cua Nam',
  tag: 'Thieu nhi',
  totalCards: '30',
  avatar: 'N',
  currentCard: '28',
};

const questions = [
  {
    number: 1,
    question: '1. Describe your crush’s personality.',
  },
  {
    number: 2,
    question:
      '2. Mùa thu rơi vào em, vào trong giấc mơ hôm qua. Mùa thu ôm mình em, chạy xa vòng tay vội vã',
  },
  {
    number: 3,
    question: '3. How many people in the room would you be willing to kiss?',
  },
  {
    number: 4,
    question: '4. When watching porn, what makes you turn it off?',
  },
  {
    number: 5,
    question:
      '5. What is something “scandalous” and sex-related that you really want to try?',
  },
];
const item = {};
