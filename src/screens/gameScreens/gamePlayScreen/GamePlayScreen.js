import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {SpinnerType1} from 'src/components';
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
const cardWidth = screenWidth * 0.8;
const separatorWidth = screenWidth - cardWidth;
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
  const [showIndicatorInfo, setShowIndicatorInfo] = useState(false);

  const dataLength = tasks ? tasks.length : 0;

  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];
  const defaultContentStyle = [Typography.title.medium, {color: textColor}];
  const progressBarWidth = screenWidth * 0.8;
  const percentValue = dataLength !== 0 ? (showIndex + 1) / dataLength : 0;
  const indicatedPartWidth = progressBarWidth * percentValue;
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

  function handleCardItemPressed() {
    showIndex !== dataLength - 1
      ? carouselRef && carouselRef.current.scrollToNext()
      : handleNavigateEndGameDialog();
  }

  function handleOnScrollEnd(item, index) {
    showIndex === dataLength && handleNavigateEndGameDialog();
    setShowIndex(index);
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <View contentContainerStyle={styles.scrollView}>
        <View style={styles.progressBar}>
          <CardDetermination
            onPressIn={handleShowIndicatorInfo}
            onPressOut={handleNotShowIndicatorInfo}
            contentStyle={defaultContentStyle}
            progressBarWidth={progressBarWidth}
            indicatedPartWidth={indicatedPartWidth}>
            {showIndicatorInfo && (
              <InfoProgressIndicator
                content={`${showIndex + 1} per ${dataLength}`}
              />
            )}
          </CardDetermination>
        </View>
        <SwipeableGameCard
          data={tasks}
          ref={carouselRef}
          style={styles.card}
          contentStyle={defaultContentStyle}
          itemWidth={cardWidth}
          containerWidth={screenWidth}
          separatorWidth={separatorWidth}
          onScrollEnd={(item, index) => handleOnScrollEnd(item, index)}
          onItemPress={handleCardItemPressed}
          initialIndex={INITIAL_INDEX}
        />
        {/*{renderBottomButtons()}*/}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    flex: 1,
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
  }, // counter: {
  //   alignSelf: 'center',
  //   backgroundColor: 'lightpink',
  //   position: 'relative',
  // },
  card: {
    paddingVertical: separatorWidth / 2,
    width: '100%',
    aspectRatio: 0.7, // paddingHorizontal: separatorWidth / 2,
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
  }, // paginationDotActive: {backgroundColor: 'blue'},
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
