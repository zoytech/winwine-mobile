import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, Typography} from 'src/themes';
import {ElevatedCard, FilledButton, FilledIconButton} from 'src/components';
import {ElevatedHeader} from './components';

const {width: screenWidth} = Dimensions.get('screen');

export default function GameWaitScreen(props) {
  const {
    onIconButtonPress = () => {},
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    supportingTextTypo = Typography.title.medium,
    bodyTypo = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;

  const [previousCard, setPreviousCard] = useState(null);
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

  function handlePressIconButton(number) {
    setPreviousCard(number + 1);
    onIconButtonPress(item);
  }

  function handleTestButtonPressed() {
    alert('test');
  }

  function renderQuestionItem(item) {
    const {question, number} = item || {};
    return (
      <>
        <FilledIconButton
          name="leftcircle"
          onPress={() => handlePressIconButton(number)}
        />
        <ElevatedCard style={shadowStyle} containerStyle={styles.gameCard}>
          <Text key={number} style={[bodyTypo, styles.text]}>
            {question}
          </Text>
        </ElevatedCard>
        <Icon name="rightcircle" size={30} color="#900" />
      </>
    );
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ElevatedHeader
          head={cardInfo?.title}
          subHeadLeft={cardInfo?.tag}
          subHeadRight={`Tổng số ${cardInfo?.totalCards} lá`}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />

        <View style={styles.supportingText}>
          {description && <Text style={supportingTextTypo}>{description}</Text>}
        </View>
        <View style={styles.cardWithButton}>
          {questions.map(renderQuestionItem)}
        </View>
        <View style={styles.action}>
          <FilledIconButton onPress={handleTestButtonPressed} name="forward">
            Test
          </FilledIconButton>
          <FilledIconButton name="forward" />
          <FilledIconButton
            name="forward"
            content={'Test'}
            onPressOut={handleTestButtonPressed}
          />
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
    question: 'Describe your crush’s personality.',
  },
  {
    number: 2,
    question:
      'Mùa thu rơi vào em, vào trong giấc mơ hôm qua. Mùa thu ôm mình em, chạy xa vòng tay vội vã',
  },
  {
    number: 3,
    question: 'How many people in the room would you be willing to kiss?',
  },
  {
    number: 4,
    question: 'When watching porn, what makes you turn it off?',
  },
  {
    number: 5,
    question:
      'What is something “scandalous” and sex-related that you really want to try?',
  },
];
const item = {};
