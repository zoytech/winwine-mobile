import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import API from 'src/apis';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledButton, FilledCard, OutlinedButton} from 'src/components';
import {StandardHeader} from '../components';
import {ScreenKeys} from '../../../../navigations/ScreenKeys';

const screenWidth = Dimensions.get('screen').width;
export default function GamePlayScreen(props) {
  const {
    navigation,
    route,
    headerTypo = Typography.title.large,
    subHeaderTypo = Typography.label.large,
    bodyTypo = Typography.body.large,
    colorVariant = ColorVariant.surface,
    style,
    ...otherProps
  } = props;

  const {deckId} = route.params;
  const [cardDeckItem, setCardDeckItem] = useState({});
  const [taskTurn, setTaskTurn] = useState(0);
  const {cardDeck: name, tasks: tasks = []} = cardDeckItem || {};
  const TOTAL_TASKS = tasks.length;
  const baseColor = Color.light[colorVariant]?.base;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function getCurrentCardDeck() {
        try {
          const cardDeck = await API.getCardDeckById(deckId);
          if (isActive) {
            setCardDeckItem(cardDeck);
            console.log('setCardDeckItem');
          }
        } catch (e) {
          //log errors
        }
      }

      getCurrentCardDeck();
      return () => {
        isActive = false;
        setTaskTurn(0);
      };
    }, [deckId]),
  );

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
    style,
  ];

  function handleLookBackButtonPressed() {
    taskTurn === 0 ? '' : setTaskTurn(taskTurn - 1);
  }

  function handleContinueButtonPressed() {
    taskTurn === TOTAL_TASKS - 1 ? '' : setTaskTurn(taskTurn + 1);
  }

  function handleNavigateToGameEndScreen() {
    navigation.navigate(ScreenKeys.GAME_END, {
      deckId: deckId || '',
    });
  }

  return (
    <SafeAreaView {...otherProps} style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <StandardHeader
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
            onPress={handleLookBackButtonPressed}
            disabled={taskTurn === 0}
          />
          <FilledButton
            content={'Lá tiếp theo'}
            style={styles.button}
            onPress={
              taskTurn === TOTAL_TASKS - 1
                ? handleNavigateToGameEndScreen
                : handleContinueButtonPressed
            }
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
    minWidth: 120,
    height: 40,
  },
});
