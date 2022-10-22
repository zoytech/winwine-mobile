import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledButton} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {StandardHeader} from '../components';
import {NavigatedGameCard} from './components';
import {ScreenKeys} from '../../../../navigations/ScreenKeys';
import {cardDeckSelector, requestingSelector} from 'src/redux/selectors';

const {width: screenWidth} = Dimensions.get('screen');

function GameWaitScreen({navigation, route}) {
  const deckId = route.params?.deckId;
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingSelector);
  const dispatch = useDispatch();
  const [taskTurn, setTaskTurn] = useState(0);
  const {cardDeck: name, tag: tag, tasks: tasks = []} = cardDeckItem || {};
  const totalTasks = tasks.length;
  const baseColor = Color.light[ColorVariant.surface]?.base;

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];

  useEffect(() => {
    dispatch(loadCardDeckById(deckId));
  }, [dispatch]);

  function handlePressFilledButton() {
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
      params: {
        deckId: deckId || '',
      },
    });
  }

  function handleBackwardButtonPressed() {
    taskTurn !== 0 && setTaskTurn(taskTurn - 1);
  }

  function handleForwardButtonPressed() {
    taskTurn !== totalTasks - 1 && setTaskTurn(taskTurn + 1);
  }

  function previewNumberOfCard(total) {
    const MAX_VIEW = 10;
    return total >= MAX_VIEW
      ? `Xem trước ${MAX_VIEW} lá bài`
      : `Xem trước ${total} lá bài`;
  }

  return (
    <>
      {requesting ? (
        <Icon name={'loading1'} />
      ) : (
        <SafeAreaView style={defaultContainerStyle}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <StandardHeader
              head={name}
              subHeadLeft={tag}
              subHeadRight={`Tổng số ${totalTasks} lá`}
              headStyle={Typography.title.large}
              subHeadStyle={Typography.label.large}
              style={styles.header}
              containerStyle={styles.header}
            />
            <View style={styles.supportingText}>
              <Text style={Typography.title.medium}>
                {previewNumberOfCard(totalTasks)}
              </Text>
            </View>
            <NavigatedGameCard
              style={styles.navigatedGameCard}
              content={tasks[taskTurn]?.task}
              onBackwardPressed={handleBackwardButtonPressed}
              onForwardPressed={handleForwardButtonPressed}
              onBackwardDisabled={taskTurn === 0}
              onForwardDisabled={taskTurn === totalTasks - 1}
            />
            <View style={styles.action}>
              <FilledButton
                content={'Choi ngay'}
                style={styles.button}
                onPress={handlePressFilledButton}
                contentStyle={Typography.title.large}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
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

export default GameWaitScreen;
