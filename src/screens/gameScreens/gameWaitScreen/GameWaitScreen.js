import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Color, ColorVariant, Typography} from 'src/themes';
import {SpinnerType1} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {GameWaitHeader, GameWaitTopAppBar} from './components';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {SwipeableGameCard} from '../components';
import {defaultOf, defaultOfDeck, heightOf, widthOf} from 'src/constants';
import {CustomStatusBar, EmptyInfoAnnouncement} from 'src/screens/components';
import {getPreviewCardNumber, getPreviewDataItem} from './utils';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import HeaderButtons from './components/gameWaitHeader/HeaderButtons';

const width = {
  CONTAINER: 320,
  CARD: 320 * 0.85,
  SEPARATOR: 10,
};
const INITIAL_INDEX = 0;
const MAX_PREVIEW = 10;

export default function GameWaitScreen({navigation, route}) {
  const {deckId, deckTitle, deckSource} = route.params;
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const dispatch = useDispatch();
  const [showIndex, setShowIndex] = useState(INITIAL_INDEX);
  const [imageHeight, setImageHeight] = useState(heightOf?.IMAGE);
  const carouselRef = useRef(null);
  const scrollViewRef = useRef([]);
  const {cardDeck, tag, uri, tasks} = cardDeckItem || {};
  const data = tasks || [];
  const dataLength = data ? data.length : defaultOf?.initDataLength;
  const {TITLE, IMAGE} = defaultOfDeck;

  const baseColor = Color.light[ColorVariant.surface]?.base;
  const textColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  useEffect(() => {
    dispatch(loadCardDeckById(deckId));
  }, [dispatch, deckId]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <GameWaitTopAppBar
          content={deckTitle}
          source={deckSource}
          navigation={navigation}
          ref={scrollViewRef}
          imageHeight={imageHeight}
        />
      ),
    });
  }, [navigation, imageHeight]);

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];
  const defaultContentStyle = [Typography.title.medium, {color: textColor}];

  function handleOnLayoutImage(event) {
    setImageHeight(event.nativeEvent.layout.height);
  }

  function handleCardItemPressed() {
    showIndex !== dataLength - 1 &&
      carouselRef &&
      carouselRef.current.scrollToNext();
  }

  function handleOnScrollEnd(item, index) {
    setShowIndex(index);
  }

  function handleNavigateCreateCardScreen() {
    navigation.navigate({
      name: ScreenKeys.CREATE_CARD,
      params: {
        deckId: deckId || '',
      },
    });
  }

  function renderButtons() {
    const handleStaringDeckPress = () => {};
    const handleDownloadDeckPress = () => {};
    const handleNavigateMoreActionPress = () => {};
    const handlePressFilledButton = () => {
      navigation.navigate({
        name: ScreenKeys.PLAY_GAME,
        params: {
          deckId: deckId,
          deckTitle: deckTitle ? deckTitle : TITLE,
          deckSource: deckSource ? deckSource : IMAGE,
        },
      });
    };
    return (
      <HeaderButtons
        onStaringDeckPress={handleStaringDeckPress}
        onDownloadDeckPress={handleDownloadDeckPress}
        onNavigateMoreActionPress={handleNavigateMoreActionPress}
        onFilledButtonPress={handlePressFilledButton}
      />
    );
  }

  function renderPreviewNumber(total) {
    return (
      <Text style={defaultContentStyle}>
        {`Xem trước ${getPreviewCardNumber(total, MAX_PREVIEW)} lá bài`}
      </Text>
    );
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <CustomStatusBar />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={scrollViewRef.current.onScroll}>
        <GameWaitHeader
          style={styles.header}
          navigation={navigation}
          routeParams={{deckId, deckTitle, deckSource}}
          cardDeckInfo={{cardDeck, tag, uri}}
          dataLength={dataLength}
          onLayoutImage={event => handleOnLayoutImage(event)}
        />
        {!dataLength || dataLength === 0 ? (
          <EmptyInfoAnnouncement
            content={'Bộ bài chưa có lá bài nào.'}
            buttonContent={'Tạo mới'}
            onPress={handleNavigateCreateCardScreen}
          />
        ) : (
          <>
            {renderButtons()}
            <View style={styles.supportingText}>
              {renderPreviewNumber(dataLength)}
            </View>
            <SwipeableGameCard
              data={getPreviewDataItem(data, INITIAL_INDEX)}
              ref={carouselRef}
              style={styles.card}
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

const styles = StyleSheet.create({
  container: {
    width: widthOf?.SCREEN,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    aspectRatio: 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  supportingText: {
    width: '100%',
    aspectRatio: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    paddingVertical: 16,
    paddingBottom: 48,
  },
  suggestingDeck: {
    width: '100%',
    aspectRatio: 1.5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 20,
  },
  buttonContent: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  headerButtonIcon: {
    borderRadius: 0,
    minWidth: 48,
    minHeight: 48,
  },
});
