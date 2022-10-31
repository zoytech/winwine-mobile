import React, {useCallback, useState, useEffect} from 'react';
import {
  Dimensions,
  InteractionManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {
  FilledButton,
  FilledCard,
  OutlinedButton,
  SmallTopBar,
  SpinnerType1,
} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {ScreenKeys} from 'src/navigations/ScreenKeys';

const screenWidth = Dimensions.get('screen').width;
export default function GamePlayScreen({navigation, route}) {
  const deckId = route.params?.deckId;
  const dispatch = useDispatch();
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const isFocused = navigation.isFocused();
  const [taskTurn, setTaskTurn] = useState(0);
  const {cardDeck: name, tasks: tasks = []} = cardDeckItem || {};
  const totalTasks = tasks.length;
  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  const iconNavigatorList = [
    {
      name: 'paperclip',
      handlePress: () => alert('button 1'),
    },
    {
      name: 'sharealt',
      handlePress: () => alert('button 2'),
    },
    {
      name: 'ellipsis1',
      handlePress: () => alert('button 3'),
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        dispatch(loadCardDeckById(deckId));
      });
      return setTaskTurn(0) && task.cancel();
    }, [dispatch]),
  );

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SmallTopBar content={name} trailingIcons={iconNavigatorList} />
      ),
    });
  }, [navigation]);

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];

  const textStyles = [{color: textColor}, styles.text];

  function handleLookBackButtonPressed() {
    taskTurn !== 0 && setTaskTurn(taskTurn - 1);
  }

  function handleContinueButtonPressed() {
    taskTurn !== totalTasks - 1 && setTaskTurn(taskTurn + 1);
  }

  function handleNavigateToGameEnd() {
    navigation.navigate({
      name: ScreenKeys.DIALOG_GAME_END,
      params: {
        deckId: deckId && deckId,
        title: name || '',
      },
    });
  }

  if (requesting && isFocused) {
    return <SpinnerType1 />;
  }

  return (
    <SafeAreaView style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[Typography.label.large, textStyles]}>
            {`Lá thứ ${taskTurn + 1}/${totalTasks}`}
          </Text>
        </View>
        <View style={styles.gameCardLayout}>
          <FilledCard style={styles.gameCard}>
            <Text style={[Typography.body.large, textStyles]}>
              {tasks[taskTurn]?.task}
            </Text>
          </FilledCard>
        </View>
        <View style={styles.action}>
          <OutlinedButton
            content={'Lá trước'}
            style={styles.button}
            onPress={handleLookBackButtonPressed}
            disabled={taskTurn === 0}
          />
          <FilledButton
            content={'Lá tiếp theo'}
            style={styles.button}
            onPress={
              taskTurn === totalTasks - 1
                ? handleNavigateToGameEnd
                : handleContinueButtonPressed
            }
          />
          <FilledButton
            content={'End'}
            style={styles.button}
            onPress={handleNavigateToGameEnd}
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
    aspectRatio: 7,
    paddingVertical: 16,
  },
  gameCardLayout: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    width: '80%',
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
    minWidth: 120,
    height: 40,
  },
});
