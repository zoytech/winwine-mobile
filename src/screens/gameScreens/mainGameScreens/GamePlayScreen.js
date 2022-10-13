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
import {ElevatedCard, FilledButton, OutlinedButton} from 'src/components';
import {ElevatedHeader} from './components';

const screenWidth = Dimensions.get('screen').width;
export default function GamePlayScreen(props) {
  const {
    onContinueButtonPressed = () => {},
    onLookBackButtonPressed = () => {},
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    bodyTypo = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;
  const {
    id: id,
    title: title,
    total: total,
    question: questions = [],
  } = CARD_DATA;
  const [currentCard, setCurrentCard] = useState(0);
  const baseColor = Color.light[colorVariant]?.base;

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
    style,
  ];

  function handleContinueButtonPressed() {
    currentCard === 0 ? '' : setCurrentCard(currentCard - 1);
    onContinueButtonPressed();
  }

  function handleLookBackButtonPressed() {
    currentCard === total ? '' : setCurrentCard(currentCard + 1);
    onLookBackButtonPressed();
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ElevatedHeader
          head={title}
          subHeadLeft={`Lá thứ ${currentCard + 1}/${total} `}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />
        <ElevatedCard style={shadowStyle} containerStyle={styles.gameCard}>
          <Text style={[bodyTypo, styles.text]}>
            {questions[currentCard]?.question}
          </Text>
        </ElevatedCard>
        <View style={styles.action}>
          <OutlinedButton
            content={'Lá trước'}
            onPress={handleLookBackButtonPressed}
            disabled={currentCard === 0}
          />
          <FilledButton
            content={'Lá tiép theo'}
            onPress={handleContinueButtonPressed}
            disabled={currentCard === total - 1}
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
    aspectRatio: 5,
  },
  gameCardLayout: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    width: '80%',
    aspectRatio: 3 / 5,
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

const shadowStyle = StyleSheet.compose(styles.gameCard, {
  width: '100%',
});

const CARD_DATA = {
  idPackage: '123',
  title: 'Bai cua Nam',
  tag: 'Thieu nhi',
  total: '5',
  questions: [
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
  ],
};
