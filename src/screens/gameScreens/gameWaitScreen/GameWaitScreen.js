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
import {Color, ColorVariant, Typography} from 'src/themes';
import {
  FilledButton,
  SmallTopBar,
  SpinnerType1,
  StandardIconButton,
} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {NavigatedGameCard} from './components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {StandardHeader} from '../components';

const {width: screenWidth} = Dimensions.get('screen');

function GameWaitScreen({navigation, route}) {
  const deckId = route.params?.deckId;
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const dispatch = useDispatch();
  const [taskTurn, setTaskTurn] = useState(0);
  const {cardDeck: cardDeck, tag: tag, tasks: tasks = []} = cardDeckItem || {};
  const totalTasks = tasks.length;
  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  console.log('first mount');
  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];

  useEffect(() => {
    dispatch(loadCardDeckById(deckId));
  }, [dispatch, deckId]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SmallTopBar
          leadingIcon={'arrowleft'}
          onLeadingIconPress={() => navigation.goBack()}
          renderRightComponents={renderRightComponents}
        />
      ),
    });
  }, [navigation]);

  function handlePressFilledButton() {
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
      params: {
        deckId: deckId,
        deckTitle: cardDeck || '',
      },
    });
  }

  function handleTestDialogButton() {
    navigation.navigate({
      name: ScreenKeys.DIALOG_GAME_EXIT,
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

  function renderRightComponents({iconStyle}) {
    return (
      <>
        <StandardIconButton
          name={'ellipsis1'}
          onPress={handleTestDialogButton}
          style={[iconStyle, styles.headerButtonIcon]}
        />
      </>
    );
  }

  function renderBottomButtons() {
    return (
      <View style={styles.action}>
        <FilledButton
          content={'Choi ngay'}
          style={styles.button}
          onPress={handlePressFilledButton}
          contentStyle={Typography.title.large}
        />
        <FilledButton
          content={'Test Dialog'}
          style={styles.button}
          onPress={handleTestDialogButton}
          contentStyle={Typography.title.large}
        />
      </View>
    );
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <StandardHeader
          head={cardDeck}
          subHeadLeft={tag}
          subHeadRight={`Tổng số ${totalTasks} lá`}
          headStyle={Typography.title.large}
          subHeadStyle={Typography.label.large}
          style={styles.header}
          containerStyle={styles.header}
        />
        <View style={styles.supportingText}>
          <Text style={[Typography.title.medium, {color: textColor}]}>
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
        {renderBottomButtons()}
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
  headerButtonIcon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
});

export default GameWaitScreen;
