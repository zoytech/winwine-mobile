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
import {
  FilledButton,
  FilledCard,
  OutlinedButton,
  OutlinedCard,
} from 'src/components';
import {FilledHeader} from '../components';

const screenWidth = Dimensions.get('screen').width;
export default function GamePlayScreen(props) {
  const {
    deckId = 2,
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    bodyTypo = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;

  const [cardDeckItem, setCardDeckItem] = useState({});
  const [taskTurn, setTaskTurn] = useState(0);
  const {cardDeck: name, tasks: tasks = []} = cardDeckItem || {};
  const TOTAL_TASKS = tasks.length;
  const baseColor = Color.light[colorVariant]?.base;

  useEffect(() => {
    getCurrentCardDeck(deckId);
  }, [deckId]);

  async function getCurrentCardDeck(cardDeckId) {
    const cardDeck = await API.getCardDeckById(cardDeckId);
    console.log('cardDeck', cardDeck);
    setCardDeckItem(cardDeck);
  }

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
    style,
  ];

  function handleLookBackButtonPressed() {
    taskTurn === 0 ? '' : setTaskTurn(taskTurn - 1);
  }

  function handleContinueButtonPressed() {
    taskTurn === TOTAL_TASKS ? '' : setTaskTurn(taskTurn + 1);
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FilledHeader
          head={name}
          subHeadLeft={`Lá thứ ${taskTurn + 1}/${TOTAL_TASKS} `}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />
        <View style={styles.gameCardLayout}>
          <FilledCard style={styles.gameCard}>
            <Text style={[bodyTypo, styles.text]}>{tasks[taskTurn]?.task}</Text>
          </FilledCard>
        </View>
        <View style={styles.action}>
          <OutlinedButton
            content={'Lá trước'}
            style={styles.button}
            onPressOut={handleLookBackButtonPressed}
            disabled={taskTurn === 0}
          />
          <FilledButton
            content={'Lá tiếp theo'}
            style={styles.button}
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
    aspectRatio: 3,
    paddingVertical: 16,
  },
  gameCardLayout: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    width: '68%',
    aspectRatio: 6 / 10,
    justifyContent: 'center',
  },
  action: {
    width: '100%',
    aspectRatio: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 16,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  button: {
    width: 120,
    height: 40,
  },
});
