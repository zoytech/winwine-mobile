import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {
  FilledButton,
  OutlinedButton,
  SmallTopBar,
  SpinnerType1,
  StandardIconButton,
} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {EndingGameDialog, ExitGameDialog} from './components';
import {SwipeableGameCard3} from '../components';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
export default function GamePlayScreen({navigation, route}) {
  const {deckId, deckTitle} = route.params;
  const dispatch = useDispatch();
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const carouselRef = useRef({
    index: 0,
  });
  const [taskTurn, setTaskTurn] = useState(0);
  const {
    tag: tag,
    uri: uri,
    cardDeck: headline,
    tasks: tasks = [],
  } = cardDeckItem || {};
  const totalTasks = tasks.length;

  useEffect(() => {
    dispatch(loadCardDeckById(deckId));
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SmallTopBar
          content={deckTitle}
          leadingIcon={'arrowleft'}
          onLeadingIconPress={() => navigation.goBack()}
          renderRightComponents={renderRightComponents}
        />
      ),
    });
  }, [navigation]);

  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];
  const textStyles = [Typography.body.large, {color: textColor}, styles.text];

  function handleLookBackButtonPressed() {
    taskTurn !== 0 && setTaskTurn(taskTurn - 1);
  }

  function handleContinueButtonPressed() {
    taskTurn !== totalTasks - 1 && setTaskTurn(taskTurn + 1);
  }

  function handleNavigateEndGameDialog() {
    const handleMainDialogPress = () => {
      navigation.navigate({
        name: ScreenKeys.HOME,
      });
    };
    const handleSubDialogPress = () => {
      navigation.goBack();
      setTaskTurn(0);
    };
    navigation.navigate({
      name: ScreenKeys.CARD_DIALOG,
      params: {
        content: (
          <EndingGameDialog
            headline={headline}
            subHeadLeft={tag}
            media={uri}
            onMainActionPress={handleMainDialogPress}
            onSubActionPress={handleSubDialogPress}
          />
        ),
      },
    });
  }

  function handleNavigateExitGameDialog() {
    const handleMainDialogPress = () => {
      navigation.navigate({
        name: ScreenKeys.HOME,
      });
    };

    const handleSubDialogPress = () => {
      navigation.goBack();
    };

    navigation.navigate({
      name: ScreenKeys.BASIC_DIALOG,
      params: {
        content: (
          <ExitGameDialog
            onMainActionPress={handleMainDialogPress}
            onSubActionPress={handleSubDialogPress}
          />
        ),
      },
    });
  }

  function renderRightComponents({iconStyle}) {
    return (
      <>
        <StandardIconButton
          name={'ellipsis1'}
          onPress={handleNavigateExitGameDialog}
          style={[iconStyle, styles.headerButtonIcon]}
        />
      </>
    );
  }

  function renderBottomButtons() {
    return (
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
              ? handleNavigateEndGameDialog
              : handleContinueButtonPressed
          }
        />
      </View>
    );
  }

  if (requesting) {
    return <SpinnerType1 />;
  }

  return (
    <SafeAreaView style={defaultContainerStyle}>
      <View contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[Typography.label.large, textStyles]}>
            {`Lá thứ ${taskTurn + 1}/${totalTasks}`}
          </Text>
        </View>
        <SwipeableGameCard3
          data={tasks}
          taskTurn={taskTurn}
          style={styles.gameCardLayout}
        />
        {renderBottomButtons()}
      </View>
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
    width: screenWidth,
    height: screenWidth * 1.3,
    paddingVertical: 16,
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
  headerButtonIcon: {
    borderRadius: 20,
    minWidth: 48,
    minHeight: 48,
  },
});

/*
 <SwipeableGameCard
            data={tasks}
            taskTurn={taskTurn}
            style={styles.gameCardLayout}
            itemStyle={styles.gameCardItem}
            cardStyle={styles.gameCard}
            contentStyle={textStyles}
          />
 */

/*
const handlePressFilledButton = () => {
    navigation.navigate(ScreenKeys.HOME, {
      deckId: deckId || '',
    });
  };
  const handlePressOutlinedButton = () => {
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
      params: {
        deckId: deckId || '',
      },
      merge: true,
    });
  };
 */
