import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {
  FilledIconToggle,
  SpinnerType1,
  StandardIconButton,
} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {
  CardDetermination,
  CustomTopAppBar,
  EndingGameDialog,
  InfoProgressIndicator,
} from './components';
import {SwipeableGameCard} from '../components';

const screenWidth = Dimensions.get('screen')?.width;
const CONTAINER_WIDTH = 320;
const cardWidth = 275;
const SEPARATOR_WIDTH = 10;
const INITIAL_INDEX = 0;

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
  const carouselRef = useRef(null);
  const [showIndex, setShowIndex] = useState(INITIAL_INDEX);
  const [showIndicatorInfo, setShowIndicatorInfo] = useState(true);
  const dataLength = tasks ? tasks.length : 0;

  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];
  const defaultContentStyle = [Typography.title.medium, {color: textColor}];
  const progressBarWidth = screenWidth * 0.8;
  const percentValue = dataLength !== 0 && (showIndex + 1) / dataLength;
  const indicatedPartWidth = progressBarWidth * percentValue;
  const minFragmentWidth = dataLength !== 0 && 1 / dataLength;
  const indicatedArrowWidth = progressBarWidth * minFragmentWidth;

  useEffect(() => {
    dispatch(loadCardDeckById(deckId));
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomTopAppBar content={deckTitle} navigation={navigation} />
      ),
    });
  }, [navigation]);

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

  function handleShowIndicatorInfo() {
    setShowIndicatorInfo(true);
  }

  function handleNotShowIndicatorInfo() {
    setShowIndicatorInfo(false);
  }

  function handleOnScrollEnd(item, index) {
    showIndex === dataLength && handleNavigateEndGameDialog();
    setShowIndex(index);
  }

  function renderBottomButtons() {
    const handleBackwardPress = () => {
      showIndex !== 0 && carouselRef && carouselRef.current.scrollToPrevious();
    };

    const handleRatingTaskPress = () => {
      alert('handleRatingQuestion');
    };
    const handleForwardPress = () => {
      showIndex !== dataLength - 1
        ? carouselRef && carouselRef.current.scrollToNext()
        : handleNavigateEndGameDialog();
    };
    const smallIconProps = {
      iconStyle: {size: 30},
      style: styles.smallIcon,
    };
    const ratingProps = {
      name: 'staro',
      selectedName: 'star',
      onPress: handleRatingTaskPress,
      iconStyle: {size: 42},
      style: styles.largeIcon,
    };
    return (
      <>
        <StandardIconButton
          {...smallIconProps}
          name={'stepbackward'}
          onPress={handleBackwardPress}
          disabled={showIndex === 0}
        />
        <FilledIconToggle {...ratingProps} />
        <StandardIconButton
          {...smallIconProps}
          name={'stepforward'}
          onPress={handleForwardPress}
        />
      </>
    );
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.progressBar}>
          {showIndicatorInfo && (
            <InfoProgressIndicator
              content={showIndex + 1}
              endContent={dataLength}
              progressBarWidth={progressBarWidth}
              indicatedArrowWidth={indicatedArrowWidth}
              indicatedPartWidth={indicatedPartWidth}
            />
          )}
          <CardDetermination
            onPressIn={handleShowIndicatorInfo}
            onPressOut={handleNotShowIndicatorInfo}
            contentStyle={defaultContentStyle}
            progressBarWidth={progressBarWidth}
            indicatedPartWidth={indicatedPartWidth}
          />
        </View>
        <SwipeableGameCard
          data={tasks}
          ref={carouselRef}
          style={styles.card}
          contentStyle={defaultContentStyle}
          itemWidth={cardWidth}
          containerWidth={CONTAINER_WIDTH}
          separatorWidth={SEPARATOR_WIDTH}
          onScrollEnd={(item, index) => handleOnScrollEnd(item, index)}
          initialIndex={INITIAL_INDEX}
        />
        <View style={styles.action}>{renderBottomButtons()}</View>
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
  mainContent: {
    width: '100%',
    flexDirection: 'column',
  },
  progressBar: {
    width: '100%',
    aspectRatio: 6,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    paddingTop: 32,
  },
  action: {
    width: '100%',
    aspectRatio: 3,
    paddingVertical: 32,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  largeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  smallIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  indicatorLine: {
    height: 32,
    backgroundColor: 'blue',
    width: 1,
    position: 'absolute',
  },

  // paginationDotActive: {backgroundColor: 'blue'},
  // paginationDotInactive: {backgroundColor: 'red'},
  // pagination: {
  //   position: 'absolute',
  //   bottom: 8,
  //   width: '100%',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  // },
  // paginationDot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   marginHorizontal: 2,
  // },
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
<CardCounter
            content={`${showIndex + 1} per ${dataLength}`}
            contentStyle={defaultContentStyle}
            style={styles.counter}
            counterSize={counterSize}
          />
 */

/*
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
 */
