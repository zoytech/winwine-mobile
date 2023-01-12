import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {SpinnerType1} from 'src/components';
import {
  GameWaitTopAppBar,
  HeaderButtons,
  HeaderImage,
  HeaderInformation,
} from './components';
import {
  cardDeckSelect,
  libraryKeyStoreSelect,
  loadCardDeckByDeckId,
  normalizedCardDecksSelect,
  requestCardDeckSelect,
  storeCardDeckIdsSelect,
  storeCardDecksSelect,
} from 'src/redux/slices';
import {SwipeableGameCard} from '../components';
import {HEIGHT, KEY} from 'src/constants';
import {CustomStatusBar, EmptyInfoAnnouncement} from 'src/screens/components';
import {getPreviewCardNumber, getPreviewDataItem} from './utils';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import gameWaitStyle from './gameWaitStyle';
import {hasStoreKeyInStorage} from 'src/utils';

const width = {
  CONTAINER: 320,
  CARD: 275,
  SEPARATOR: 10,
};
const INITIAL_INDEX = 0;
const MAX_PREVIEW = 10;
const EMPTY_CONTENT = 'Bộ bài chưa có lá bài nào.';

export default function GameWaitScreen({navigation, route}) {
  const {cardDeckIdParam, cardDeckNameParam, cardDeckImageParam} = route.params;
  const cardDeckRqs = useSelector(cardDeckSelect);
  const requesting = useSelector(requestCardDeckSelect);
  const keyStores = useSelector(libraryKeyStoreSelect);
  const normalizedCardDecks = useSelector(normalizedCardDecksSelect);
  const dispatch = useDispatch();
  const [showIndex, setShowIndex] = useState(INITIAL_INDEX);
  const [imageHeight, setImageHeight] = useState(HEIGHT?.IMAGE);
  const [hasStoreKey, setHasStoreKey] = useState();
  const carouselRef = useRef(null);
  const scrollViewRef = useRef([]);
  const cardDeckItem = normalizedCardDecks.hasOwnProperty(cardDeckIdParam)
    ? normalizedCardDecks[cardDeckIdParam]
    : cardDeckRqs;

  useEffect(() => {
    dispatch(loadCardDeckByDeckId(cardDeckIdParam));
  }, [dispatch, cardDeckIdParam]);

  useEffect(() => {
    async function hasItemFromStorage() {
      const hasSaveIdRqs = await hasStoreKeyInStorage(
        cardDeckIdParam,
        KEY?.SAVE_LIB,
        keyStores,
      );
      setHasStoreKey(hasSaveIdRqs);
    }

    hasItemFromStorage();
  }, [cardDeckIdParam]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <GameWaitTopAppBar
          content={cardDeckNameParam}
          source={cardDeckImageParam}
          navigation={navigation}
          ref={scrollViewRef}
          imageHeight={imageHeight}
        />
      ),
    });
  }, [navigation, imageHeight]);
  const {cardDeckImage, numberOfCards, previewCards} = cardDeckItem || {};
  const previewCardData = previewCards
    ? getPreviewDataItem(previewCards, INITIAL_INDEX)
    : [];
  const previewContent = `Xem trước ${getPreviewCardNumber(
    previewCardData.length,
    MAX_PREVIEW,
  )} lá bài`;
  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    gameWaitStyle.container,
  ];
  const defaultContentStyle = [Typography.title.medium, {color: textColor}];

  function handleOnLayoutImage(event) {
    setImageHeight(event.nativeEvent.layout.height);
  }

  function handleCardItemPressed() {
    showIndex !== numberOfCards - 1 &&
      carouselRef &&
      carouselRef.current.scrollToNext();
  }

  function handleOnScrollEnd(item, index) {
    setShowIndex(index);
  }

  function handlePressFilledButton() {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        cardDeckIdParam: cardDeckIdParam,
        cardDeckNameParam: cardDeckNameParam,
        cardDeckImageParam: cardDeckImageParam,
      },
    });
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <CustomStatusBar />
      <ScrollView
        contentContainerStyle={gameWaitStyle.scrollView}
        onScroll={scrollViewRef.current.onScroll}>
        <View style={gameWaitStyle.header}>
          <HeaderImage
            cardDeckImage={cardDeckImage}
            onLayoutImage={e => handleOnLayoutImage(e)}
          />
          <HeaderInformation
            data={cardDeckItem}
            headStyle={Typography.headline.small}
            contentStyle={Typography.label.large}
          />
        </View>
        {!previewCards || previewCards.length === 0 ? (
          <EmptyInfoAnnouncement
            title={EMPTY_CONTENT}
            style={gameWaitStyle.emptyView}
          />
        ) : (
          <>
            <HeaderButtons
              onFilledButtonPress={handlePressFilledButton}
              data={cardDeckItem}
              hasStoreKey={hasStoreKey}
            />
            <View style={gameWaitStyle.supportingText}>
              <Text style={defaultContentStyle}>{previewContent}</Text>
            </View>
            <SwipeableGameCard
              data={previewCardData}
              ref={carouselRef}
              style={gameWaitStyle.card}
              contentStyle={defaultContentStyle}
              itemWidth={width?.CARD}
              containerWidth={width?.CONTAINER}
              separatorWidth={width?.SEPARATOR}
              onScrollEnd={(item, index) => handleOnScrollEnd(item, index)}
              onItemPress={handleCardItemPressed}
              initialIndex={INITIAL_INDEX}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
