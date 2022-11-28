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
import {FilledButton, SpinnerType1, StandardIconButton} from 'src/components';
import {loadCardDeckById} from 'src/redux/actions';
import {
  CustomTopAppBar,
  HeaderButtons,
  HeaderImage,
  HeaderInformation,
} from './components';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {cardDeckSelector, requestingDeckSelector} from 'src/redux/selectors';
import {SwipeableGameCard} from '../components';
import avatarImg from '../../../assets/images/preview-package/user.png';

const screenWidth = Dimensions.get('screen')?.width;
const cardWidth = screenWidth * 0.75;
const separatorWidth = screenWidth - cardWidth;
const INITIAL_INDEX = 0;
const MAX_VIEW = 10;

function GameWaitScreen({navigation, route}) {
  const {deckId, deckTitle} = route.params;
  const cardDeckItem = useSelector(cardDeckSelector);
  const requesting = useSelector(requestingDeckSelector);
  const dispatch = useDispatch();
  const [showIndex, setShowIndex] = useState(INITIAL_INDEX);
  const carouselRef = useRef(null);
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
        <CustomTopAppBar content={deckTitle} navigation={navigation} />
      ),
    });
  }, [navigation]);

  const defaultContainerStyle = [
    {backgroundColor: baseColor},
    styles.container,
  ];
  const defaultContentStyle = [Typography.title.medium, {color: textColor}];

  function handlePressFilledButton() {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        deckId: deckId,
        deckTitle: cardDeck || '',
      },
    });
  }

  function getPreviewCardNumber(total) {
    return total >= MAX_VIEW ? MAX_VIEW : total;
  }

  function renderPreviewNumber(total) {
    return (
      <Text style={[Typography.title.medium, {color: textColor}]}>
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
      console.log('starProps');
    };
    const handleDownloadDeckPress = () => {
      console.log('downloadProps');
    };
    const handleNavigateMoreActionPress = () => {
      console.log('moreActionProps');
    };
    const starProps = {
      name: 'staro',
      onPress: handleStaringDeckPress,
      selected: true,
      style: iconStyle,
    };
    const downloadProps = {
      name: 'download',
      onPress: handleDownloadDeckPress,
      selected: true,
      style: iconStyle,
    };
    const moreActionProps = {
      name: 'ellipsis1',
      onPress: handleNavigateMoreActionPress,
      style: iconStyle,
    };
    return (
      <>
        <StandardIconButton {...starProps} />
        <StandardIconButton {...downloadProps} />
        <StandardIconButton {...moreActionProps} />
      </>
    );
  }

  function renderHeaderRightButtons({buttonStyle, contentButtonStyle}) {
    return (
      <FilledButton
        content={'Chơi ngay'}
        style={buttonStyle}
        contentStyle={contentButtonStyle}
        onPress={() => {
          console.log('Play now ');
        }}
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

  if (requesting) {
    return <SpinnerType1 />;
  }
  return (
    <SafeAreaView style={defaultContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <HeaderImage source={source} />
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
          containerWidth={screenWidth}
          separatorWidth={separatorWidth}
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
    // backgroundColor: 'green',
  },
  action: {
    width: '100%',
    aspectRatio: 4,
    flexDirection: 'row',
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
