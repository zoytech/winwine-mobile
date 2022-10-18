import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledButton} from 'src/components';
import API from 'src/apis';
import {FilledHeader} from '../components';
import {NavigatedGameCard} from './components';

const {width: screenWidth} = Dimensions.get('screen');

export default function GameWaitScreen(props) {
  const {
    deckId = 4,
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    supportingTextTypo = Typography.title.medium,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;

  const [cardDeckItem, setCardDeckItem] = useState({});
  const [taskTurn, setTaskTurn] = useState(0);
  const {cardDeck: name, tag: tag, tasks: tasks = []} = cardDeckItem || {};
  const TOTAL_TASKS = tasks.length;
  const baseColor = Color.light[colorVariant]?.base;

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
    style,
  ];

  useEffect(() => {
    getCurrentCardDeck(deckId);
  }, [deckId]);

  async function getCurrentCardDeck(cardDeckId) {
    const cardDeck = await API.getCardDeckById(cardDeckId);
    setCardDeckItem(cardDeck);
  }

  function handlePressFilledButton() {
    alert('move to game screen');
  }

  function handleBackwardButtonPressed() {
    taskTurn === 0 ? '' : setTaskTurn(taskTurn - 1);
  }

  function handleForwardButtonPressed() {
    taskTurn === TOTAL_TASKS ? '' : setTaskTurn(taskTurn + 1);
  }

  function previewNumberOfCard(total) {
    const MAX_VIEW = 10;
    return total >= MAX_VIEW
      ? `Xem trước ${MAX_VIEW} lá bài`
      : `Xem trước ${total} lá bài`;
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FilledHeader
          head={name}
          subHeadLeft={tag}
          subHeadRight={`Tổng số ${TOTAL_TASKS} lá`}
          headStyle={headerTypo}
          subHeadStyle={subHeaderTypo}
          style={styles.header}
          containerStyle={styles.header}
        />
        <View style={styles.supportingText}>
          <Text style={supportingTextTypo}>
            {previewNumberOfCard(TOTAL_TASKS)}
          </Text>
        </View>
        <NavigatedGameCard
          style={styles.navigatedGameCard}
          content={tasks[taskTurn]?.task}
          onBackwardPressed={handleBackwardButtonPressed}
          onForwardPressed={handleForwardButtonPressed}
          onBackwardDisabled={taskTurn === 0}
          onForwardDisabled={taskTurn === TOTAL_TASKS - 1}
        />
        <View style={styles.action}>
          <FilledButton
            content={'Choi ngay'}
            style={styles.button}
            onPress={handlePressFilledButton}
            contentStyle={headerTypo}
            // disabled={true}
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
  navigatedGameCard: {
    width: '100%',
  },
  action: {
    width: '100%',
    aspectRatio: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 50,
  },
});
