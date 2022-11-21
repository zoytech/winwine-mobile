import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {FilledButton, OutlinedButton, SpinnerType1} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {CustomTopAppBar, EndingGameDialog} from './components';
import {SwipeableGameCard} from '../components';

const screenWidth = Dimensions.get('screen')?.width;
const itemWidth = screenWidth;
const cardWidth = itemWidth * 0.8;
const centerAlign = (screenWidth - cardWidth) / 2;
const INITIAL_INDEX = 1;

function Pagination({index}) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {tasks.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function GamePlayScreen({navigation, route}) {
  const {deckId, deckTitle} = route.params;
  const dispatch = useDispatch();
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const {
    tag: tag,
    uri: uri,
    cardDeck: headline,
    tasks: tasks = [],
  } = cardDeckItem || {};
  const tasksLength = tasks.length;
  const carouselRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [showIndex, setShowIndex] = useState(INITIAL_INDEX);

  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];
  const textStyles = [Typography.body.large, {color: textColor}, styles.text];

  useEffect(() => {
    dispatch(loadCardDeckById(deckId));
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomTopAppBar
          content={deckTitle}
          navigation={navigation}
          onResetIndex={handleResetIndex}
        />
      ),
    });
  }, [navigation]);

  function handleResetIndex() {
    carouselRef && carouselRef.current.resetIndex();
  }

  function handleNavigateEndGameDialog() {
    const handleMainDialogPress = () => {
      navigation.navigate({
        name: ScreenKeys.HOME,
      });
    };
    const handleSubDialogPress = () => {
      navigation.goBack();
      carouselRef.current.resetIndex();
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

  function renderBottomButtons() {
    const handlePreviousButtonPressed = () => {
      carouselRef && carouselRef.current.scrollToPrevious();
    };

    const handleNextButtonPressed = () => {
      carouselRef && carouselRef.current.scrollToNext();
    };
    return (
      <View style={styles.action}>
        <OutlinedButton
          content={'Lá trước'}
          style={styles.button}
          onPress={handlePreviousButtonPressed}
          disabled={disabled}
        />
        <FilledButton
          content={'Lá tiếp theo'}
          style={styles.button}
          onPress={handleNextButtonPressed}
        />
      </View>
    );
  }

  function handleOnScrollEnd(item, index) {
    showIndex === tasksLength && handleNavigateEndGameDialog();
    index === 0 ? setDisabled(true) : setDisabled(false);
    setShowIndex(index + 1);
  }

  if (requesting) {
    return <SpinnerType1 />;
  }

  return (
    <SafeAreaView style={defaultContainerStyle}>
      <View contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[Typography.label.large, textStyles]}>
            {`Lá thứ ${showIndex}/${tasksLength}`}
          </Text>
        </View>
        <SwipeableGameCard
          data={tasks}
          ref={carouselRef}
          style={styles.gameCardLayout}
          onScrollEnd={(item, index) => handleOnScrollEnd(item, index)}
          initialIndex={INITIAL_INDEX}
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
  item: {
    justifyContent: 'center',
    width: itemWidth,
    height: itemWidth * 1.4,
    borderColor: 'green',
    borderWidth: 0.5,
    paddingHorizontal: centerAlign,
  },
  header: {
    width: '100%',
    height: itemWidth / 7,
    paddingVertical: 16,
    alignItems: 'center',
  },
  gameCardLayout: {
    width: screenWidth,
    height: screenWidth * 1.3,
  },
  action: {
    width: '100%',
    aspectRatio: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 16,
  },
  button: {
    minWidth: 120,
    height: 40,
  },
  paginationDotActive: {backgroundColor: 'blue'},
  paginationDotInactive: {backgroundColor: 'red'},
  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

/*
 <SwipeableGameCard
            data={tasks}
            index={index}
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
