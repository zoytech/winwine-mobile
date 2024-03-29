import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components';
import {
  cardsSelect,
  loadCardDeckByDeckId,
  loadCardsByDeckId,
  requestCardsSelect,
} from 'src/redux/slices';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {DECK, WIDTH} from 'src/constants';
import {
  CardProgressTrace,
  EndingGameDialog,
  GamePlayTopAppBar,
  IndicatorTrace,
} from './components';
import {SwipeableGameCard} from '../components';
import {CustomStatusBar, EmptyInfoAnnouncement} from 'src/screens/components';
import gamePlayStyle from './gamePlayStyle';
import useRecentlyCardDeckById from '../../homeScreen/useRecentlyCardDeckById';

const screenWidth = WIDTH?.SCREEN;
const width = {
  CONTAINER: 320,
  CARD: 275,
  SEPARATOR: 10,
};

const INITIAL_INDEX = 0;

export default function GamePlayScreen({navigation, route}) {
  const {
    cardDeckIdParam,
    cardDeckNameParam,
    cardDeckImageParam,
    hashtagsParam,
  } = route.params;
  const dispatch = useDispatch();

  const fetchedCards = useSelector(cardsSelect);
  const cardsRqs = useSelector(requestCardsSelect);
  const carouselRef = useRef(null);
  const [showIndex, setShowIndex] = useState(INITIAL_INDEX);
  const [showIndicatorInfo, setShowIndicatorInfo] = useState(true);

  const {cardDeck} = useRecentlyCardDeckById(cardDeckIdParam);
  const cards =
    fetchedCards && fetchedCards.length > 0
      ? fetchedCards
      : cardDeck && cardDeck?.previewCards;

  const dataLength = cards ? cards.length : DECK?.NUMBER_OF_CARDS;
  const progressBarWidth = screenWidth * 0.8;
  const percentValue = dataLength !== 0 && (showIndex + 1) / dataLength;
  const indicatedPartWidth = progressBarWidth * percentValue;
  const minFragmentWidth = dataLength !== 0 && 1 / dataLength;
  const indicatedArrowWidth = progressBarWidth * minFragmentWidth;

  const cardNumber = `${showIndex + 1} per ${dataLength}`;
  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    gamePlayStyle.container,
  ];
  const defaultContentStyle = [Typography.title.medium, {color: textColor}];

  useEffect(() => {
    dispatch(loadCardsByDeckId(cardDeckIdParam));
  }, [dispatch, cardDeckIdParam]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <GamePlayTopAppBar
          content={cardDeckNameParam}
          navigation={navigation}
        />
      ),
    });
  }, [navigation]);

  function handleNavigateEndGameDialog() {
    const handleMainDialogPress = () => {
      navigation.popToTop();
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
            headline={cardDeckNameParam}
            hashtags={hashtagsParam}
            media={cardDeckImageParam}
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
      showIndex !== INITIAL_INDEX &&
        carouselRef &&
        carouselRef.current.scrollToPrevious();
    };
    const handleForwardPress = () => {
      showIndex !== dataLength - 1
        ? carouselRef && carouselRef.current.scrollToNext()
        : handleNavigateEndGameDialog();
    };
    const smallIconProps = {
      iconStyle: {size: 30},
      style: gamePlayStyle.smallIcon,
    };
    return (
      <>
        <StandardIconButton
          {...smallIconProps}
          name={'stepbackward'}
          onPress={handleBackwardPress}
          disabled={showIndex === INITIAL_INDEX}
        />
        <StandardIconButton
          {...smallIconProps}
          name={'stepforward'}
          onPress={handleForwardPress}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={defaultContainerStyle}>
      <CustomStatusBar />
      {!cards || cards.length === 0 ? (
        <EmptyInfoAnnouncement
          title={'Bộ bài chưa có lá bài nào.'}
          style={gamePlayStyle.emptyView}
        />
      ) : (
        <ScrollView contentContainerStyle={gamePlayStyle.scrollView}>
          <View style={gamePlayStyle.progressBar}>
            {showIndicatorInfo && (
              <IndicatorTrace
                content={cardNumber}
                endContent={dataLength}
                progressBarWidth={progressBarWidth}
                indicatedArrowWidth={indicatedArrowWidth}
                indicatedPartWidth={indicatedPartWidth}
              />
            )}
            <CardProgressTrace
              onPressIn={handleShowIndicatorInfo}
              onPressOut={handleNotShowIndicatorInfo}
              contentStyle={defaultContentStyle}
              progressBarWidth={progressBarWidth}
              indicatedPartWidth={indicatedPartWidth}
            />
          </View>
          <SwipeableGameCard
            data={fetchedCards}
            ref={carouselRef}
            style={gamePlayStyle.card}
            contentStyle={defaultContentStyle}
            itemWidth={width?.CARD}
            containerWidth={width?.CONTAINER}
            separatorWidth={width?.SEPARATOR}
            onScrollEnd={(item, index) => handleOnScrollEnd(item, index)}
            initialIndex={INITIAL_INDEX}
          />
          <View style={gamePlayStyle.action}>{renderBottomButtons()}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
