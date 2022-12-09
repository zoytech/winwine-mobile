import React, {useEffect, useRef, useState} from 'react';
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
  SpinnerType1,
  StandardIconButton,
  StandardIconToggle,
} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {
  GameWaitTopAppBar,
  HeaderButtons,
  HeaderImage,
  HeaderInformation,
} from './components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {SwipeableGameCard} from '../components';
import avatarImg from 'src/assets/images/preview-package/user.png';

const screenWidth = Dimensions.get('screen')?.width;
const CONTAINER_WIDTH = 320;
const cardWidth = CONTAINER_WIDTH * 0.85;
const SEPARATOR_WIDTH = 10;
const INITIAL_INDEX = 0;
const MAX_VIEW = 10;

function GameWaitScreen({navigation, route}) {
  const {deckId, deckTitle, deckSource} = route.params;
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const dispatch = useDispatch();
  const [showIndex, setShowIndex] = useState(INITIAL_INDEX);
  const [imageHeight, setImageHeight] = useState(0);
  const carouselRef = useRef(null);
  const scrollViewRef = useRef([]);

  const myRef = useRef([]);
  const {
    cardDeck: cardDeck,
    tag: tag,
    uri: source,
    tasks: tasks = [],
  } = cardDeckItem || {};
  const dataLength = tasks ? tasks.length : 0;
  const userName = 'Thành Nam nè';
  const avatar = avatarImg;
  const description =
    'alo con oaihf jahf ia fhaj uafujh jhaj afjhjafj alo con oaihf jahf ia fhaj uafujh jhaj afjhjafj';
  const likes = 12;
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

  function getPreviewCardNumber(total) {
    return total >= MAX_VIEW ? MAX_VIEW : total;
  }

  function renderPreviewNumber(total) {
    return (
      <Text style={defaultContentStyle}>
        {`Xem trước ${getPreviewCardNumber(total)} lá bài`}
      </Text>
    );
  }

  function getPreviewDataItem(total) {
    const showLimitedCard = getPreviewCardNumber(total);
    return tasks.slice(0, showLimitedCard);
  }

  function renderHeaderLeftButtons({iconStyle}) {
    const handleStaringDeckPress = () => {
      console.log('starProps 123');
    };
    const handleDownloadDeckPress = () => {
      console.log('downloadProps');
    };
    const handleNavigateMoreActionPress = () => {
      console.log('moreActionProps');
    };
    const starProps = {
      name: 'staro',
      selectedName: 'star',
      onPress: handleStaringDeckPress,
      style: iconStyle,
    };
    const downloadProps = {
      name: 'downcircleo',
      selectedName: 'downcircle',
      onPress: handleDownloadDeckPress,
      style: iconStyle,
    };
    const moreActionProps = {
      name: 'ellipsis1',
      selectedName: 'ellipsis1',
      onPress: handleNavigateMoreActionPress,
      style: iconStyle,
    };
    return (
      <>
        <StandardIconToggle {...starProps} />
        <StandardIconToggle {...downloadProps} />
        <StandardIconButton {...moreActionProps} />
      </>
    );
  }

  function renderHeaderRightButtons({buttonStyle, contentButtonStyle}) {
    const handlePressFilledButton = () => {
      navigation.navigate({
        name: ScreenKeys.PLAY_GAME,
        params: {
          deckId: deckId,
          deckTitle: cardDeck || '',
        },
      });
    };

    return (
      <FilledButton
        content={'Chơi ngay'}
        style={buttonStyle}
        contentStyle={contentButtonStyle}
        onPress={handlePressFilledButton}
      />
    );
  }

  function handleCardItemPressed() {
    showIndex !== dataLength - 1 &&
      carouselRef &&
      carouselRef.current.scrollToNext();
  }

  function handleOnScrollEnd(item, index) {
    setShowIndex(index);
  }

  function handleOnLayoutImage(event) {
    setImageHeight(event.nativeEvent.layout.height);
    console.log('imageHeight: ', imageHeight);
  }

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={scrollViewRef.current.onScroll}>
        <View style={styles.header}>
          <HeaderImage source={source} onLayoutImage={handleOnLayoutImage} />
          <HeaderInformation
            head={cardDeck}
            tag={tag}
            total={dataLength}
            userName={userName}
            avatar={avatar}
            description={description}
            totalLike={likes}
            headStyle={Typography.headline.small}
            contentStyle={Typography.label.large}
          />
          <HeaderButtons
            renderLeftComponents={renderHeaderLeftButtons}
            renderRightComponents={renderHeaderRightButtons}
          />
        </View>
        <View style={styles.supportingText}>
          {renderPreviewNumber(dataLength)}
        </View>
        <SwipeableGameCard
          data={getPreviewDataItem(dataLength)}
          ref={carouselRef}
          style={styles.card}
          contentStyle={defaultContentStyle}
          itemWidth={cardWidth}
          containerWidth={CONTAINER_WIDTH}
          separatorWidth={SEPARATOR_WIDTH}
          onScrollEnd={(item, index) => handleOnScrollEnd(item, index)}
          onItemPress={handleCardItemPressed}
          initialIndex={INITIAL_INDEX}
        />
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

export default GameWaitScreen;
