import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import API from 'src/apis';
import {Color, ColorVariant, Typography} from 'src/themes';
import {ElevatedCard, FilledButton, OutlinedButton} from 'src/components';
import {ElevatedHeader} from './components';

const screenWidth = Dimensions.get('screen').width;
export default function GamePlayScreen(props) {
  const {
    deckId = 1,
    onContinueButtonPressed = () => {},
    onLookBackButtonPressed = () => {},
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    bodyTypo = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;

  const [cardDeckItem, setCardDeckItem] = useState({});
  const [taskTurn, setTaskTurn] = useState(0);
  const {package: name, data: questions = []} = cardDeckItem || {};
  const TOTAL_TASKS = questions.length;
  const baseColor = Color.light[colorVariant]?.base;

  useEffect(() => {
    getCurrentCardDeck(deckId);
  }, [deckId]);

  async function getCurrentCardDeck(cardDeckId) {
    const cardDeck = await API.getCardDeckById(cardDeckId);
    setCardDeckItem(cardDeck);
  }

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
    style,
  ];

  function handleLookBackButtonPressed() {
    taskTurn === 0 ? '' : setTaskTurn(taskTurn - 1);
    onContinueButtonPressed();
  }

  function handleContinueButtonPressed() {
    taskTurn === TOTAL_TASKS ? '' : setTaskTurn(taskTurn + 1);
    onLookBackButtonPressed();
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ElevatedHeader
          head={name}
          subHeadLeft={`Lá thứ ${taskTurn + 1}/${TOTAL_TASKS} `}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />
        <ElevatedCard style={shadowStyle} containerStyle={styles.gameCard}>
          <Text style={[bodyTypo, styles.text]}>
            {questions[taskTurn]?.text}
          </Text>
        </ElevatedCard>
        <View style={styles.action}>
          <OutlinedButton
            content={'Lá trước'}
            onPressOut={handleLookBackButtonPressed}
            disabled={taskTurn === 0}
          />
          <FilledButton
            content={'Lá tiép theo'}
            onPressOut={handleContinueButtonPressed}
            disabled={taskTurn === TOTAL_TASKS - 1}
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
